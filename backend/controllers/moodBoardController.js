const asyncHandler = require('express-async-handler');
const MoodBoard = require('../models/MoodBoard');

// @desc    Get user's mood boards
// @route   GET /api/moodboards
// @access  Private
const getMoodBoards = asyncHandler(async (req, res) => {
    const moodBoards = await MoodBoard.find({ user: req.user.id });
    res.status(200).json(moodBoards);
});

// @desc    Create a new mood board
// @route   POST /api/moodboards
// @access  Private
const createMoodBoard = asyncHandler(async (req, res) => {
    const { title, imageUrl, notes } = req.body;

    if (!title || !imageUrl) {
        res.status(400);
        throw new Error('Please add a title and image');
    }

    const moodBoard = await MoodBoard.create({
        user: req.user.id,
        title,
        imageUrl,
        notes
    });

    res.status(201).json(moodBoard);
});

// @desc    Delete a mood board
// @route   DELETE /api/moodboards/:id
// @access  Private
const deleteMoodBoard = asyncHandler(async (req, res) => {
    const moodBoard = await MoodBoard.findById(req.params.id);

    if (!moodBoard) {
        res.status(404);
        throw new Error('Mood board not found');
    }

    if (moodBoard.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await moodBoard.deleteOne();
    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getMoodBoards,
    createMoodBoard,
    deleteMoodBoard
};
