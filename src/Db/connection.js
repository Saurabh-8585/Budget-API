const mongoose = require('mongoose');
const { Config } = require('../Constant/Config');
mongoose.set('strictQuery', true);
const dbConnection = async () => {
    try {
        let db = await mongoose.connect(Config.DB_CONNECTION_URL);
        console.log(db.connection.host);
    } catch (error) {
        console.log(error);
    }

}
module.exports = dbConnection 