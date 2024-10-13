const express = require('express');
const cors = require('cors');

const dbConnection = require('./src/Db/connection');
const { Config } = require('./src/Constant/Config');

const app = express();
const PORT = Config.SERVER_PORT

const Category = require('./src/Routes/Category');
const Expense = require('./src/Routes/Expense');


dbConnection()

// app.use(cors({
//     origin: [Config.FRONTEND_URL],
//     credentials: true
// }));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/category', Category)
app.use('/api/expense', Expense)



app.listen(PORT, () => {
    console.log(`Application Started on ${PORT}`)
})