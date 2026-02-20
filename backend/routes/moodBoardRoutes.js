const express = require('express');
const router = express.Router();
const {
    getMoodBoards,
    createMoodBoard,
    deleteMoodBoard
} = require('../controllers/moodBoardController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMoodBoards).post(protect, createMoodBoard);
router.route('/:id').delete(protect, deleteMoodBoard);

module.exports = router;
