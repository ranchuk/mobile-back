const DBM = require("../db/DBM");

const edit_user = async (req, res) => {
  console.log(req.body);
  if (!req.body || !req.body.username) {
    return res.status(200).json({
      status: "unauthorized"
    });
  }
  const { username, firstName, lastName, password, phoneNumber } = req.body;
  const dbm = new DBM();
  await dbm.open();
  try {
    await dbm.updateUser([
      password,
      firstName,
      lastName,
      phoneNumber,
      username
    ]);
  } catch (e) {
    return res.json({
      message: "error edit user",
      status: "failed",
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
