const express = require('express');
const authMiddleware = require('../Middleware/');
const router = express.Router();


router.get('/bookmarks', authMiddleware, getAllBookMarks)
router.post('/add/:id', authMiddleware, addToBookMark)
router.delete('/remove/:id', authMiddleware, removeBookMark)

module.exports = router