const DBM = require("../db/DBM");

const getAllProducts = async (req, res) => {
  const dbm = new DBM();
  await dbm.open();
  const productsList = await dbm.getAllProducts();
  res.json({
    data: productsList,
    status: "successful"
  });
};

module.exports = getAllProducts;
