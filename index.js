const dotenv = require('dotenv');
const express = require('express');
const dbConnection = require('./src/Db/connection');
dotenv.config()

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
dbConnection()

app.use(cors({
    origin: [process.env.PROD_FRONTEND_URL, process.env.TEST_FRONTEND_URL],
    credentials: true
}));

// express middleware handling the body parsing 
app.use(express.json());

// express middleware handling the form parsing
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Application Started on ${PORT}`)
})