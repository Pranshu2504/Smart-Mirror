const mongoose = require('mongoose');

const shoppingListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [{
        itemName: {
            type: String,
            required: true
        },
        isPurchased: {
            type: Boolean,
            default: false
        },
        link: {
            type: String // Optional link to purchase
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
