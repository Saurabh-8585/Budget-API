const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    clerkUserId: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
