const express = require('express')
const { getAllCheckouts, getCheckoutById, createCheckout, updateCheckout, deleteCheckout } = require('../controllers/checkoutController')


const router = express.Router()

router.get('/', getAllCheckouts)

router.get('/:id', getCheckoutById)

router.post('/', createCheckout)

router.put('/', updateCheckout)

router.delete('/', deleteCheckout)

module.exports = router