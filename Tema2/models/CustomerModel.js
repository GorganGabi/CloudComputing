const mongoose = require('mongoose');

let CustomerSchema = new mongoose.Schema({
    name: {
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

module.exports.Customer = mongoose.model('Customer', CustomerSchema);