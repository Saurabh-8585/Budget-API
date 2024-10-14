const Category = require('../Models/Category');
const Expense = require('../Models/Expense');
const { startOfMonth, endOfMonth, subDays, isAfter, parseISO, getDate } = require('date-fns');

const getAllExpenseByCategoryIdAndSubCategoryId = async (req, res) => {
    const { categoryId, subCategoryId } = req.query;
    const { clerkUserId } = req;

    try {
        const query = { clerkUserId };

        if (categoryId !== '0') {
            query.categoryId = categoryId;
        }

        if (subCategoryId !== '0') {
            query.subCategoryId = subCategoryId;
        }

        const expenses = await Expense.find(query)
            .populate('categoryId', 'category')
            .populate({
                path: 'categoryId',
                populate: { path: 'subcategories', match: { _id: subCategoryId } }
            });

        const groupedExpenses = expenses.reduce((acc, expense) => {
            const date = new Date(expense.createdAt).toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(expense);
            return acc;
        }, {});

        res.status(200).json(groupedExpenses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving expenses', error });
    }
};

const addExpense = async (req, res) => {
    const { amount, categoryId, subCategoryId, expenseName } = req.body;
    const { clerkUserId } = req;

    try {
        const newExpense = new Expense({
            clerkUserId,
            amount,
            categoryId,
            subCategoryId,
            expenseName,
        });

        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
};

const getCurrentMonthExpense = async (req, res) => {
    const { clerkUserId } = req;

    try {
        const start = startOfMonth(new Date());
        const end = endOfMonth(new Date());

        const expenses = await Expense.find({
            clerkUserId,
            createdAt: { $gte: start, $lt: end }
        }).populate('categoryId', 'category');

        const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        const categoryWiseData = expenses.reduce((acc, curr) => {
            const category = curr.categoryId.category;
            if (!acc[category]) {
                acc[category] = {
                    category: category,
                    totalAmount: 0,
                    percentage: 0,
                };
            }
            acc[category].totalAmount += curr.amount;
            return acc;
        }, {});
        const formattedData = Object.values(categoryWiseData).map(item => {
            item.percentage = ((item.totalAmount / totalAmount) * 100).toFixed(2);
            return item;
        });

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving current month expenses', error });
    }
};


const getLastWeekExpense = async (req, res) => {
    const { clerkUserId } = req;

    try {
        const lastWeekDate = subDays(new Date(), 7);

        const lastWeekExpenses = await Expense.find({
            clerkUserId,
            createdAt: { $gte: lastWeekDate }
        }).populate('categoryId', 'category');


        const formatData = lastWeekExpenses.map(d => ({
            date: new Date(d.createdAt).toISOString().split('T')[0],
            category: d.categoryId.category,
            amount: d.amount
        }))
        res.status(200).json(formatData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving last week expenses', error });
    }
};


const generateRandomExpenses = async (clerkUserId) => {
    try {

        const categories = await Category.find().populate('subcategories');
        const transactions = [];

        for (let i = 0; i < 6; i++) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            const randomSubCategory = randomCategory.subcategories[Math.floor(Math.random() * randomCategory.subcategories.length)];

            const newExpense = new Expense({
                clerkUserId,
                amount: (Math.floor(Math.random() * 500)),
                categoryId: randomCategory._id,
                subCategoryId: randomSubCategory._id,
                expenseName: `Mock Expense ${i + 1}`,
                createdAt: subDays(new Date(), i)
            });

            transactions.push(newExpense.save());
        }
    } catch (error) {
        console.log(error)
    }
};

const generateExpensesIfNone = async (req, res) => {
    const { clerkUserId } = req;

    try {
        const existingExpenses = await Expense.find({ clerkUserId });

        if (existingExpenses.length === 0) {
            await generateRandomExpenses(clerkUserId);
            return res.status(201).json({ mockDataGenerated: true });
        } else {
            return res.status(200).json({ mockDataGenerated: false });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error generating expenses', error });
    }
};



module.exports = {
    getAllExpenseByCategoryIdAndSubCategoryId,
    addExpense,
    getCurrentMonthExpense,
    getLastWeekExpense,
    generateExpensesIfNone
};
