const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    subcategories: [subcategorySchema]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

