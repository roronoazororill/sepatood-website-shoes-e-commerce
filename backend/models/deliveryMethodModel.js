const mongoose = require('mongoose');

const DeliveryMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    estimatedDeliveryTime: {
        type: Number // You can adjust the type based on your needs (hours, days, etc.)
    },
    cost: {
        type: Number,
        required: true
    }
});

const DeliveryMethod = mongoose.model('DeliveryMethod', DeliveryMethodSchema);

module.exports = DeliveryMethod;