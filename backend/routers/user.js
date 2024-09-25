const express = require('express')
const router = express.Router()
const { registerUser, logUserIn, getUserProfile, editUserProfile, updateUserAvatar } = require('../controllers/user')
const verifyToken = require('../middleware/auth')
const upload = require('../config/multer-config')

router.post('/register', registerUser)
router.post('/login', logUserIn)
router.get('/:username', verifyToken, getUserProfile)
router.put('/:username/edit', verifyToken, editUserProfile)
router.put('/:username/avatar', [verifyToken, upload.single('image')], updateUserAvatar)

module.exports = router