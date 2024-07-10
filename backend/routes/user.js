const express = require('express')
const { login, signup, getUser, updateUserById } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/:id', getUser)

router.put('/:id', updateUserById)

module.exports = router