const express = require("express");
const bodyParser = require("body-parser");
const config = require("./src/shared/config");
const login = require("./src/api/login");
const add_product = require("./src/api/add_product");
const add_cart = require("./src/api/add_cart");
const getAllUserProducts = require("./src/api/getAllUserProducts");
const getAllProducts = require("./src/api/getAllProducts");
const getCartProducts = require("./src/api/get_cart_products");

// const update_car_status = require("./src/api/update_car_status");
const remove_cart = require("./src/api/remove_cart");
const remove_my_product = require("./src/api/remove_my_products");

// const check_car = require("./src/api/check_car");
const edit_user = require("./src/api/edit_user");
// const get_all_times = require("./src/api/get_all_times");
const DBM = require("./src/db/DBM");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", config.allowOriginUri);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.post("/login", login);
app.post("/add_product", add_product);
app.post("/add_cart", add_cart);
app.post("/remove_cart", remove_cart);
app.post("/remove_my_product", remove_my_product);
app.post("/edit_user", edit_user);
app.get("/getAllUserProducts", getAllUserProducts);
app.get("/get_all_products", getAllProducts);
app.get("/get_cart_products", getCartProducts);

// app.get("/update_car_status", update_car_status);
// app.get("/get_all_times", get_all_times);

async function resetTable() {
  const dbm = new DBM();
  await dbm.open();
  // await dbm.createProductsTable();
  // await dbm.insertProduct([
  //   "ranchuk",
  //   "Lenovo laptop",
  //   "computers",
  //   "lenovolenovolenovolenovolenovolenovo"
  // ]);

  // await dbm.createUsersTable();
  // await dbm.insertUser(["ranchuk", "123456", "ran", "gantz", "0509409038"]);

  // await dbm.createCartsTable();
  // await dbm.insertToCart(["ranchuk", 1]);

  // const carsList = await dbm.getAllUserCars(['amitmarko']);
  // console.log(carsList);
  // await dbm.createUserTable();
  // await dbm.createCarsTable();
  // await dbm.insertUser(['amitmarko','12345','amit','markovich',100]);
  // await dbm.insertCar(['amitmarko', '3330023', 0]);
  await dbm.close();
}

// resetTable();

app.listen(config.apiPort, () =>
  console.log(`The API is listening on port ${config.apiPort}!`)
);
