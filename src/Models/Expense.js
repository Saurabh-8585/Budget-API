const expenseSchema = new Schema({
    clerkUserId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    expenseName: {
        type: String,
        required: true

    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
