const asyncHandler = require('express-async-handler');
const ClothingItem = require('../models/ClothingItem');

// @desc    Get all clothing items for a user
// @route   GET /api/wardrobe
// @access  Private
const getClothingItems = asyncHandler(async (req, res) => {
    const items = await ClothingItem.find({ user: req.user.id });
    res.status(200).json(items);
});

// @desc    Add a clothing item
// @route   POST /api/wardrobe
// @access  Private
const addClothingItem = asyncHandler(async (req, res) => {
    const { category, subCategory, color, tags } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!category || !imageUrl) {
        res.status(400);
        throw new Error('Please include category and image');
    }

    const item = await ClothingItem.create({
        user: req.user.id,
        category,
        subCategory,
        color,
        imageUrl,
        tags: tags ? tags.split(',') : [] // Handle potential string input from FormData
    });

    res.status(201).json(item);
});

// @desc    Update a clothing item
// @route   PUT /api/wardrobe/:id
// @access  Private
const updateClothingItem = asyncHandler(async (req, res) => {
    const item = await ClothingItem.findById(req.params.id);

    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the item user
    if (item.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedItem = await ClothingItem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedItem);
});

// @desc    Delete a clothing item
// @route   DELETE /api/wardrobe/:id
// @access  Private
const deleteClothingItem = asyncHandler(async (req, res) => {
    const item = await ClothingItem.findById(req.params.id);

    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the item user
    if (item.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await item.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getClothingItems,
    addClothingItem,
    updateClothingItem,
    deleteClothingItem
};
