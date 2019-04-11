const DBM = require("../db/DBM");

const add_cart = async (req, res) => {
  console.log(req.body.username, req.body.productId);
  if (!req.body || !req.body.username || !req.body.productId) {
    return res.status(403).json({
      status: "unauthorized"
    });
  }
  const { username, productId } = req.body;
  const dbm = new DBM();
  await dbm.open();
  try {
    await dbm.insertToCart([username, productId]);
  } catch (e) {
    return res.status(403).json({
      status: "error insert"
    });
  } finally {
    await dbm.close();
  }
  res.json({
    message: "product added",
    status: "successful",
    data: req.body
  });
};

module.exports = add_cart;
