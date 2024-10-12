const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
mongoose.set('strictQuery', true);
const dbConnection = async () => {
    try {
        let db = await mongoose.connect(process.env.DB_CONNECTION_URL);
        console.log(db.connection.host);
    } catch (error) {
        console.log(error);
    }

}
module.exports = dbConnection 