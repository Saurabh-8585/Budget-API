const dotenv = require('dotenv');
dotenv.config()

const APP_TYPE = process.env.APP_TYPE
const DB_CONNECTION_URL = APP_TYPE === "production" ? process.env.PROD_DB_CONNECTION_URL : process.env.LOCAL_DB_CONNECTION_URL
const FRONTEND_URL = APP_TYPE === "production" ? process.env.PROD_FRONTEND_URL : process.env.TEST_FRONTEND_URL
const SERVER_PORT = process.env.SERVER_PORT || 5000

const Config = {
    DB_CONNECTION_URL,
    FRONTEND_URL,
    SERVER_PORT
}
module.exports = { Config }