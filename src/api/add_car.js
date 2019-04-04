const DBM = require('../db/DBM');

const add_car = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.carNumber) {
        return res.status(403).json({
            status: 'unauthorized'
        });
    }
    const { username, carNumber } = req.body;
    const dbm = new DBM();
    await dbm.open();
    try {
        await dbm.insertCar([username, carNumber, 0]);
    } catch (e) {
        return res.json({
            message: 'car number is alreday exist',
            status: 'failed',
            carNumber,
            username
        });
    } finally {
        await dbm.close();
    }
    res.json({
        message: 'car added',
        status: 'successful',
        carNumber,
        username
    });

}

module.exports = add_car;