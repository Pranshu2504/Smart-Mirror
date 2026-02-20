const mongoose = require('mongoose');

const clothingItemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        required: [true, 'Please specify a category (Top, Bottom, Dress, etc.)'],
        enum: ['Top', 'Bottom', 'Dress', 'Outerwear', 'Shoes', 'Accessory']
    },
    subCategory: {
        type: String, // e.g., 'T-Shirt', 'Jeans', 'Sneakers'
    },
    color: {
        type: String
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL']
    },
    tags: {
        type: [String], // e.g., 'Casual', 'Formal', 'Summer'
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ClothingItem', clothingItemSchema);
