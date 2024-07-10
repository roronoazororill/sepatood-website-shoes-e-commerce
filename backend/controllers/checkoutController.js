const Checkout = require('../models/checkoutModel');

// Controller functions
const createCheckout = async (req, res) => {
    try {
        const { user, cart, address, paymentMethod } = req.body;

        const newCheckout = new Checkout({
            user,
            cart,
            address,
            paymentMethod,
            status: 'pending'
        });

        const savedCheckout = await newCheckout.save();
        res.json(savedCheckout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllCheckouts = async (req, res) => {
    try {
        const checkouts = await Checkout.find();
        res.json(checkouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCheckoutById = async (req, res) => {
    res.json(res.checkout);
};

const updateCheckout = async (req, res) => {
    if (req.body.status != null) {
        res.checkout.status = req.body.status;
    }
    try {
        const updatedCheckout = await res.checkout.save();
        res.json(updatedCheckout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteCheckout = async (req, res) => {
    try {
        await res.checkout.remove();
        res.json({ message: 'Deleted Checkout' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCheckout,
    getAllCheckouts,
    getCheckoutById,
    updateCheckout,
    deleteCheckout
};