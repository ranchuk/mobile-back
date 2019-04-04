const DBM = require('../db/DBM');

const remove_car = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.carNumber) {
        return res.status(403).json({
            status: 'unauthorized'
        });
    }
    const { username, carNumber } = req.body;
    const dbm = new DBM();
    await dbm.open();
    try {
        await dbm.removeCar([username, carNumber]);
    } catch (e) {
        return res.json({
            message:'car number is alreday exist',
            status: 'failed'
        }); 
    }finally{
        await dbm.close();
    }
    res.json({
        message:'car deleted',
        status: 'successful',
        carNumber,
        username
    });

}

module.exports = remove_car;