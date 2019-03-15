const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    type: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: false,
        unique: true,
        trim: true
    },
    user_id: {
        type: String,
        required: false,
        unique: false,
        trim: true
    }
});

module.exports.Product = mongoose.model('Product', ProductSchema);