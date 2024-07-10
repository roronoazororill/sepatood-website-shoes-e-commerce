const mongoose = require('mongoose')
const Shoe = require('../models/shoeModel')

const addShoe = async (req, res) => {
    const { brand, model, size, condition, color, price, availability, description } = req.body
    const images = req.files.map(file => file.path);
    try {
        const shoe = await Shoe.create({ images, brand, model, size, condition, color, price, availability, description })
        res.status(200).json(shoe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getAllShoes = async (req, res) => {
    try {
        const shoes = await Shoe.find()
        res.status(200).json(shoes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getShoe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such shoex found' })
    }

    try {
        const shoe = await Shoe.findById(id)
        res.status(200).json(shoe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const searchShoes = async (req, res) => {
    const query = req.query.q

    try {

        if (!query || query.trim() === '' || query.length <= 1) {
            return res.status(400).json({ message: 'Search query is missing or empty' });
        }

        const shoes = await Shoe.find({
            $or: [
                { brand: { $regex: new RegExp(query, 'i') } },
                { model: { $regex: new RegExp(query, 'i') } }
            ]
        })

        if (!shoes.length) {
            // No shoes found for the query
            return res.status(404).json({ message: 'No matching shoes found' });
        }


        res.status(200).json(shoes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const updateShoe = async (req, res) => {
    const { brand, model, size, condition, color, price, availability, description } = req.body;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such shoe found' })
    }
    try {
        let updatedImages = [];
        if (req.files && req.files.length > 0) {
            updatedImages = req.files.map(file => file.path);
        }

        const shoe = await Shoe.findById(id);

        if (!shoe) {
            return res.status(404).json({ error: 'Shoe not found' });
        }

        shoe.model = model
        shoe.brand = brand
        shoe.size = size
        shoe.condition = condition
        shoe.color = color
        shoe.price = price
        shoe.availability = availability
        shoe.description = description
        if (updatedImages.length > 0) {
            shoe.images = updatedImages;
        }

        const updatedShoe = await shoe.save();

        res.status(200).json(updatedShoe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteShoe = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such shoe found' })
    }

    try {
        const shoe = await Shoe.findByIdAndDelete(id)
        res.status(200).json(shoe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { addShoe, getAllShoes, getShoe, updateShoe, deleteShoe, searchShoes }
