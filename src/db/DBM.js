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
  async createUserTable() {
    const sql =
      "CREATE TABLE Users (username TEXT PRIMARY KEY, password TEXT, firstName TEXT, lastName TEXT, capacity INTEGER)";
    return await this._run(sql);
  }

  async insertUser(params) {
    const sql =
      "INSERT INTO Users (username,password,firstName,lastName,capacity) VALUES (?,?,?,?,?)";
    return await this._run(sql, params);
  }

  async getUser(params) {
    const sql = `SELECT * FROM Users WHERE username = ? AND password = ?`;
    return await this._get(sql, params);
  }

  async updateUser(params) {
    const sql = `UPDATE Users SET password = ?, firstName = ?, lastName = ?, capacity = ? WHERE username = ?`;
    return await this._run(sql, params);
  }

  // CARS TABLE
  async createCarsTable() {
    const sql =
      "CREATE TABLE Cars (username TEXT , carNumber TEXT, isInside INTEGER, PRIMARY KEY(username,carNumber))";
    return await this._run(sql);
  }

  async insertCar(params) {
    const sql = "INSERT INTO Cars (username,carNumber,isInside) VALUES (?,?,?)";
    return await this._run(sql, params);
  }

  async removeCar(params) {
    const sql = "DELETE FROM Cars WHERE username = ? AND carNumber= ?";
    return await this._run(sql, params);
  }

  async updateCarInside(params) {
    const sql = `UPDATE Cars SET isInside = ? WHERE carNumber = ? AND username = ?`;
    return await this._run(sql, params);
  }

  async checkCar(params) {
    const sql = "SELECT * FROM Cars WHERE carNumber = ?";
    return await this._all(sql, params);
  }

  async getAllUserCars(params) {
    const sql = `SELECT * FROM Cars WHERE username = ?`;
    return await this._all(sql, params);
  }

  // TIME TIMES
  async createTimesTable() {
    const sql ="CREATE TABLE Times (username TEXT, carNumber TEXT, enter TEXT, exit TEXT)";
    return await this._run(sql);
  }

  async insertTimeRow(params) {
    const sql ="INSERT INTO Times (username,carNumber,enter,exit) VALUES (?,?,?,?)";
    return await this._run(sql, params);
  }

  async updateExitTime(params) {
    const sql = `UPDATE Times SET exit = ? WHERE username = ? AND carNumber = ? AND enter = ?`;
    return await this._run(sql, params);
  }

  async getCarNumberTimes(params) {
    const sql = `SELECT * FROM Times WHERE carNumber = ? AND username = ? AND exit IS NULL`;
    return await this._get(sql, params);
  }

  async getAllTimes(params) {
    const sql = `SELECT * FROM Times WHERE username = ?`;
    return await this._all(sql, params);
  }


  // OTHERS

  async deleteTable(tableName) {
    const sql = `DROP TABLE  ${tableName}`;
    return await this._run(sql);
  }

  async updateEmailReminder(params) {
    const sql = `UPDATE policyStatus SET date = ?, status = ? WHERE id = ?;`;
    return await this._run(sql, params);
  }

  async getAllStatus() {
    const sql = `SELECT * FROM policyStatus`;
    return await this._all(sql);
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
