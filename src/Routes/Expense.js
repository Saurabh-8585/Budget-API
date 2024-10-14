const express = require('express');
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const {
    getAllExpenseByCategoryIdAndSubCategoryId,
    addExpense,
    getCurrentMonthExpense,
    getLastWeekExpense,
    generateExpensesIfNone
} = require('../Controller/Expense');
const router = express.Router();

router.get('/get_current_month_expense', AuthMiddleware, getCurrentMonthExpense)
router.get('/get_last_week_expense', AuthMiddleware, getLastWeekExpense)

router.get('/get_all_expense_by_categoryId_and_subCategoryId', AuthMiddleware, getAllExpenseByCategoryIdAndSubCategoryId)
router.post('/add_expense', AuthMiddleware, addExpense)

router.get('/generate_mock_data', AuthMiddleware, generateExpensesIfNone)


module.exports = router