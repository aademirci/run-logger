const express = require('express')
const router = express.Router()
const { createRun, editRun, deleteRun, getRun } = require('../controllers/run')
const verifyToken = require('../middleware/auth')

router.get('/:id', getRun)
router.post('/create', verifyToken, createRun)
router.put('/edit/:id', verifyToken, editRun)
router.delete('/delete/:id', verifyToken, deleteRun)

module.exports = router