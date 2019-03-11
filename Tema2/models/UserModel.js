const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: false,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        unique: false,
        required: false,
        trim: true
    }
});

module.exports.User = mongoose.model('User', UserSchema);