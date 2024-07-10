const express = require('express')
const { createTransactionToken } = require('../controllers/paymentController')
const router = express.Router()

router.post('/', createTransactionToken)

module.exports = router