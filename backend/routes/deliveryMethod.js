const express = require('express')
const { getAllDeliveryMethods, getDeliveryMethodById, createDeliveryMethod, updateDeliveryMethod, deleteDeliveryMethod } = require('../controllers/deliveryMethodController')


const router = express.Router()

router.get('/', getAllDeliveryMethods)

router.get('/:id', getDeliveryMethodById)

router.post('/', createDeliveryMethod)

router.put('/', updateDeliveryMethod)

router.delete('/', deleteDeliveryMethod)

module.exports = router