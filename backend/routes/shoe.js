const express = require('express')
const {
    addShoe,
    getAllShoes,
    getShoe,
    updateShoe,
    deleteShoe,
    searchShoes
} = require('../controllers/shoeController')
const upload = require('../middleware/multerConfig')
const requireAuth = require('../middleware/requireAuthAdmin')

const router = express.Router()


router.post('/', upload.array('images'), addShoe)

router.get('/', getAllShoes)

router.get('/id/:id', getShoe)

router.put('/:id', upload.array('images'), updateShoe)

router.delete('/:id', deleteShoe)

router.get('/search', searchShoes)

module.exports = router