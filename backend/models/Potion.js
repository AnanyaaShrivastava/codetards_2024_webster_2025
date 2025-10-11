const mongoose = require('mongoose');

const PotionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    time: {
        type: String, // e.g., "7:00 AM"
        required: true,
    },
    type: {
        type: String, // 'AM' or 'PM'
        enum: ['AM', 'PM'],
        required: true
    }
});

module.exports = mongoose.model('Potion', PotionSchema);