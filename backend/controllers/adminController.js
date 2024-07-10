const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');


const adminSignup = async (req, res) => {
    try {
        const { email, password } = req.body;


        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();

        const _id = newAdmin._id
        const token = jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: 60 })


        res.status(201).json({ newAdmin, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;


        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const _id = admin._id

        const token = jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: 60 })

        res.status(200).json({ admin, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { adminSignup, adminLogin };