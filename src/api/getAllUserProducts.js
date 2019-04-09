const DBM = require("../db/DBM");

const getAllUserProducts = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(403).json({
      status: "unauthorized"
    });
  }
  const dbm = new DBM();
  await dbm.open();
  const productList = await dbm.getAllUserProducts([username]);
  res.json({
    data: productList,
    status: "successful"
  });
};

module.exports = getAllUserProducts;
