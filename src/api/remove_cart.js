const DBM = require("../db/DBM");

const remove_cart = async (req, res) => {
  if (!req.body || !req.body.username || !req.body.productId) {
    return res.status(403).json({
      status: "unauthorized"
    });
  }
  const { username, productId } = req.body;
  const dbm = new DBM();
  await dbm.open();
  try {
    await dbm.removeFromCart([username, productId]);
  } catch (e) {
    return res.json({
      message: "error remove from cart",
      status: "failed"
    });
  } finally {
    await dbm.close();
  }
  res.json({
    message: "item deleted",
    status: "successful",
    productId,
    username
  });
};

module.exports = remove_cart;
