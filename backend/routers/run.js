const express = require('express')
const router = express.Router()
const { createRun, editRun, deleteRun, getRun } = require('../controllers/run')
const verifyToken = require('../middleware/auth')
const upload = require('../config/multer-config')

router.get('/:id', getRun)
router.post('/create', [verifyToken, upload.array('photos[]', 10)], createRun)
router.put('/edit/:id', [verifyToken, upload.array('photos[]', 10)], editRun)
router.delete('/delete/:id', verifyToken, deleteRun)

module.exports = router