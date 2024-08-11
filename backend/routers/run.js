const express = require('express')
const router = express.Router()
const { createRun, editRun, deleteRun } = require('../controllers/run')
const verifyToken = require('../middleware/auth')


router.post('/create', verifyToken, createRun)
router.put('/edit/:id', verifyToken, editRun)
router.delete('/delete/:id', verifyToken, deleteRun)

module.exports = router