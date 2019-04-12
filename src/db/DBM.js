const sqlite3 = require("sqlite3");
const Promise = require("bluebird");

class DBM {
  constructor() {
    this.db;
  }

  async open() {
    try {
      this.db = await new sqlite3.Database("./src/db/db.db");
      console.log("Connected to database");
    } catch (e) {
      console.log("Could not connect to database", err);
    }
  }

  async close() {
    try {
      await this.db.close();
      console.log("Database closed");
    } catch (e) {
      console.log("Could not close the database", err);
    }
  }

  // USER TABLE
  async createUsersTable() {
    const sql =
      "CREATE TABLE Users (username TEXT PRIMARY KEY, password TEXT, firstName TEXT, lastName TEXT,phoneNumber TEXT)";
    return await this._run(sql);
  }

  async insertUser(params) {
    const sql =
      "INSERT INTO Users (username,password,firstName,lastName,phoneNumber) VALUES (?,?,?,?,?)";
    return await this._run(sql, params);
  }

  async getUser(params) {
    const sql = `SELECT * FROM Users WHERE username = ? AND password = ?`;
    return await this._get(sql, params);
  }

  async updateUser(params) {
    const sql = `UPDATE Users SET password = ?, firstName = ?, lastName = ?, phoneNumber = ? WHERE username = ?`;
    return await this._run(sql, params);
  }

  //PRODUCTS TABLE

  async createProductsTable() {
    const sql =
      "CREATE TABLE Products (productId INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT , title TEXT, category TEXT, description TEXT)";
    return await this._run(sql);
  }

  async insertProduct(params) {
    const sql =
      "INSERT INTO Products (username,title,category,description) VALUES (?,?,?,?)";
    return await this._run(sql, params);
  }

  async removeProduct(params) {
    console.log(params);
    const productId = params[1];
    console.log(productId);
    // const sql = `DELETE FROM Carts where productId=${productId}`;
    // await this._run(sql);
    const sql = "DELETE FROM Products WHERE username=? and productId=?";
    return await this._run(sql, params);
  }

  async updateProduct(params) {
    const sql = `UPDATE Products SET title = ?, category=?, description=? WHERE productId = ?`;
    return await this._run(sql, params);
  }

  async getAllUserProducts(params) {
    const sql = `SELECT * FROM Products WHERE username = ?`;
    return await this._all(sql, params);
  }
  async getAllProducts() {
    const sql = `SELECT * FROM Products inner join Users ON Users.username=Products.username`;
    return await this._all(sql);
  }
  async getCartProducts(username) {
    const sql = `SELECT * FROM Carts inner join Products on Carts.productId=Products.ProductId
    inner join Users ON Users.username=Products.username where Carts.username= '${username}'`;
    return await this._all(sql);
  }
  async getCartProduct(params) {
    const sql = `SELECT * FROM Carts where username = ? AND productId = ?`;
    return await this._get(sql, params);
  }

  // CARTS TABLE

  async createCartsTable() {
    const sql =
      "CREATE TABLE Carts (cartId INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT, productId INTEGER)";
    return await this._run(sql);
  }

  async insertToCart(params) {
    const result = await this.getCartProduct(params);
    if (!result) {
      const sql = "INSERT INTO Carts (username,productId) VALUES (?,?)";
      return await this._run(sql, params);
    }
  }

  async removeFromCart(params) {
    const sql = "DELETE FROM Carts WHERE username=? AND productId=?";
    return await this._run(sql, params);
  }

  // OTHERS

  async deleteTable(tableName) {
    const sql = `DROP TABLE  ${tableName}`;
    return await this._run(sql);
  }

  _run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  _get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  _all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async close() {
    await this.db.close();
  }
}

module.exports = DBM;
