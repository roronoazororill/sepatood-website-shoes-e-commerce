const DeliveryMethod = require('../models/deliveryMethodModel');

// Controller functions
const createDeliveryMethod = async (req, res) => {
    try {
        const { name, description, estimatedDeliveryTime, cost } = req.body;

        const newDeliveryMethod = new DeliveryMethod({
            name,
            description,
            estimatedDeliveryTime,
            cost
        });

        const savedDeliveryMethod = await newDeliveryMethod.save();
        res.json(savedDeliveryMethod);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllDeliveryMethods = async (req, res) => {
    try {
        const deliveryMethods = await DeliveryMethod.find();
        res.json(deliveryMethods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getDeliveryMethodById = async (req, res) => {
    res.json(res.deliveryMethod);
};

const updateDeliveryMethod = async (req, res) => {
    try {
        const { name, description, estimatedDeliveryTime, cost } = req.body;

        if (name != null) {
            res.deliveryMethod.name = name;
        }
        if (description != null) {
            res.deliveryMethod.description = description;
        }
        if (estimatedDeliveryTime != null) {
            res.deliveryMethod.estimatedDeliveryTime = estimatedDeliveryTime;
        }
        if (cost != null) {
            res.deliveryMethod.cost = cost;
        }

        const updatedDeliveryMethod = await res.deliveryMethod.save();
        res.json(updatedDeliveryMethod);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteDeliveryMethod = async (req, res) => {
    try {
        await res.deliveryMethod.remove();
        res.json({ message: 'Deleted Delivery Method' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createDeliveryMethod,
    getAllDeliveryMethods,
    getDeliveryMethodById,
    updateDeliveryMethod,
    deleteDeliveryMethod
};