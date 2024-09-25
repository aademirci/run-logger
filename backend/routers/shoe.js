const express = require('express')
const router = express.Router()
const { createShoes, editShoes, deleteShoes, getShoes } = require('../controllers/shoe')
const verifyToken = require('../middleware/auth')
const upload = require('../config/multer-config')

router.get('/:id', getShoes)
router.post('/create', [verifyToken, upload.single('image')], createShoes)
router.put('/edit/:id', verifyToken, editShoes)
router.delete('/delete/:id', verifyToken, deleteShoes)

module.exports = router