const Address = require('../models/addressModel');

// Get all addresses
const getAllAddresses = async (req, res) => {
    const { userId } = req.query
    try {
        const addresses = await Address.find({ user: userId });
        res.json(addresses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific address by ID
const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json(address);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new address
const createAddress = async (req, res) => {
    const address = new Address({
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country,
        user: req.body.user,
        label: req.body.label,
        recipient: req.body.recipient
    });

    try {
        const newAddress = await address.save();
        res.status(201).json(newAddress);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an existing address
const updateAddress = async (req, res) => {
    const { addressId } = req.query
    try {
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        address.street = req.body.street;
        address.city = req.body.city;
        address.state = req.body.state;
        address.postalCode = req.body.postalCode;
        address.country = req.body.country;
        address.user = req.body.user;
        address.label = req.body.label
        address.recipient = req.body.recipient

        const updatedAddress = await address.save();
        res.json(updatedAddress);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an address by ID
const deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.query
        const address = await Address.findByIdAndDelete(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json({ message: 'Address deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
};