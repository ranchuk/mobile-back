const DBM = require("../db/DBM");

const getCartProducts = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(403).json({
      status: "unauthorized"
    });
  }
  const dbm = new DBM();
  await dbm.open();
  const productsList = await dbm.getCartProducts(username);
  console.log(productsList);
  res.json({
    data: productsList,
    status: "successful"
  });
};

module.exports = getCartProducts;
