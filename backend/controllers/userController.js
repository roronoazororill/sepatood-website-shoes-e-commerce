const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const _id = user._id

        const token = jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: 60 })

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const signup = async (req, res) => {
    try {
        const { username, email, phone, password, confirmPassword } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password doesn`t match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, phone, password: hashedPassword });
        await user.save();

        const _id = user._id
        const token = jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: 60 })


        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user found, please login' })
    }

    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const updateUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { login, signup, getUser, updateUserById }