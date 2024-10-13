
const { categoriesData } = require('../Constant/CategoriesData');
const Category = require('../Models/Category');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error });
    }
};

const addAllCategory = async (req, res) => {
    try {
        const addCategory = await Category.insertMany(categoriesData)
        res.status(200).json(addCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error adding categories', error });

    }
}

module.exports = { getAllCategories, addAllCategory };
