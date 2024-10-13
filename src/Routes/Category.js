const express = require('express');
const authMiddleware = require('../Middleware/AuthMiddleware');
const { getAllCategories, addAllCategory } = require('../Controller/Category');
const router = express.Router();


router.get('/get_all_categories', getAllCategories)
router.get('/initialize_category', addAllCategory)



module.exports = router