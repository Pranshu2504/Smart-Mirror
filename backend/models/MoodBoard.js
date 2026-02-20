const mongoose = require('mongoose');

const moodBoardSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title for the mood board']
    },
    imageUrl: {
        type: String,
        required: true // The mood board image (collage or single image)
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MoodBoard', moodBoardSchema);
