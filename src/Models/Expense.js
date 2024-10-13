const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category.subcategories',
        required: true
    },
    expenseName: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Expense', expenseSchema);
