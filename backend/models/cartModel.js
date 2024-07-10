const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    shoeId: {
        type: String,
        required: true
    },
    shoeName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    image: {
        type: String
    },
    size: {
        type: Number,
        required: true
    }

});

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [CartItemSchema],
    totalPrice: {
        type: Number
    }
});

CartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

CartSchema.pre('save', function (next) {
    this.calculateTotalPrice();
    next();
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart; 