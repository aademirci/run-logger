const express = require('express')
const router = express.Router()
const { registerUser, logUserIn } = require('../controllers/user')

router.post('/register', registerUser)
router.post('/login', logUserIn)

module.exports = router