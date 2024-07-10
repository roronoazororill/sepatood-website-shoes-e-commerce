const express = require('express')
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController')
const router = express.Router()

router.post('/', addToCart)

router.get('/:userId', getCart)

router.post('/remove', removeFromCart)

module.exports = router