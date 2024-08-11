const express = require('express')
const router = express.Router()
const { createRun } = require('../controllers/run')
const verifyToken = require('../middleware/auth')


router.post('/create', verifyToken, createRun)

module.exports = router