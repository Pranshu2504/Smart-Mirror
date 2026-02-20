const mongoose = require('mongoose');

const outfitSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        default: 'New Outfit'
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClothingItem'
    }],
    occasion: {
        type: String // e.g., 'Work', 'Party', 'Date'
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Outfit', outfitSchema);
