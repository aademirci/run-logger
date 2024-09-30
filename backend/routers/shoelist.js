const express = require('express')
const router = express.Router()
const { getShoeBrands, getShoeModels } = require('../controllers/shoelist')
const verifyToken = require('../middleware/auth')
const upload = require('../config/multer-config')

router.get('/brand/:brand', getShoeBrands)
router.get('/model/:model', getShoeModels)

module.exports = router