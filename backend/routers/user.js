const express = require('express')
const router = express.Router()
const { registerUser, logUserIn, getUserProfile, editUserProfile } = require('../controllers/user')
const verifyToken = require('../middleware/auth')

router.post('/register', registerUser)
router.post('/login', logUserIn)
router.get('/:username', verifyToken, getUserProfile)
router.put('/:username/edit', verifyToken, editUserProfile)

module.exports = router