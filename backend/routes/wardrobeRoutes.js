const express = require('express');
const router = express.Router();
const {
    getClothingItems,
    addClothingItem,
    updateClothingItem,
    deleteClothingItem
} = require('../controllers/wardrobeController');
const { protect } = require('../middleware/authMiddleware');

const { upload } = require('../config/cloudinary');

router.route('/').get(protect, getClothingItems).post(protect, upload.single('image'), addClothingItem);
router.route('/:id').put(protect, updateClothingItem).delete(protect, deleteClothingItem);

module.exports = router;
