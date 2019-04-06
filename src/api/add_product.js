const DBM = require("../db/DBM");

const add_product = async (req, res) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.title ||
    !req.body.category ||
    !req.body.description
  ) {
    return res.status(403).json({
      status: "unauthorized"
    });
  }
  const { username, title, category, description } = req.body;
  const dbm = new DBM();
  await dbm.open();
  try {
    await dbm.insertProduct([username, title, category, description]);
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

module.exports = add_product;
