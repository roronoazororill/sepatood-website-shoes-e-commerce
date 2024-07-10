const express = require('express')
const { getAllAddresses, getAddressById, createAddress, updateAddress, deleteAddress } = require('../controllers/addressController')

const router = express.Router()

router.get('/', getAllAddresses)

router.get('/:id', getAddressById)

router.post('/', createAddress)

router.put('/', updateAddress)

router.delete('/', deleteAddress)

module.exports = router