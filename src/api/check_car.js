const DBM = require("../db/DBM");

const check_car = async (req, res) => {
  const { carNumber } = req.query;
  if (!carNumber) {
    return res.status(403).json({
      status: "unauthorized"
    });
  }
  const dbm = new DBM();
  await dbm.open();
  const car = await dbm.checkCar([carNumber]);
  const status = car.length > 0 ? 1 : 0;

  if (status) {
    const userName = car[0].username;
    if (car[0].isInside) {
      // Exit from parking
      const carTime = await dbm.getCarNumberTimes([carNumber, userName]);
      await dbm.updateExitTime([new Date().toString(), userName,carNumber,carTime.enter]);
      await dbm.updateCarInside([0, carNumber, userName]);
    } else {
        // Enter to parking
        await dbm.insertTimeRow([userName, carNumber,new Date().toString(),null ]);
        await dbm.updateCarInside([1, carNumber, userName]);
    }
  }
  await dbm.close();
  console.log("car", car);
  res.json({
    status
  });
};

module.exports = check_car;
