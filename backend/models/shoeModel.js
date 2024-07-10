const mongoose = require('mongoose')

const shoeSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        enum: ['New', 'Like New', 'Good', 'Fair'],
        default: 'Good'
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        enum: ['In stock', 'Sold out'],
        default: 'In stock'
    },
    description: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
}, { timestamps: true });

module.exports = mongoose.model('Shoe', shoeSchema)