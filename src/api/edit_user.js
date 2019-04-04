const DBM = require("../db/DBM");

const edit_user = async (req, res) => {
  if (!req.body || !req.body.username) {
    return res.status(200).json({
      status: "unauthorized"
    });
  }
  const { username, firstName, lastName, password, capacity } = req.body;
  const dbm = new DBM();
  await dbm.open();
  try {
    await dbm.updateUser([password, firstName, lastName, capacity, username]);
  } catch (e) {
    return res.json({
      message: "car number is alreday exist",
      status: "failed",
      carNumber,
      username
    });
  } finally {
    await dbm.close();
  }
  res.json({
    message: "edit user",
    status: "successful",
    data: req.body
  });
};

module.exports = edit_user;
