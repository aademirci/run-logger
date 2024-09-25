const userModel = require('../models/user')
const shoeModel = require('../models/shoe')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const secret = process.env.APP_SECRET

const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        if (!userName || !email || !password) return res.send({ msg: 'Any of the username, email, or password are required to register.' })

        const foundUserName = await userModel.findOne({ userName })
        const foundEmail = await userModel.findOne({ email })

        if (foundUserName) return res.send({ msg: 'User with this username already exists.' })
        if (foundEmail) return res.send({ msg: 'User with this email address already exists.' })

        const hashedPassword = await bcrypt.hash(password, 10)
        const photoURL = 'https://res.cloudinary.com/aademirci/image/upload/c_fill,h_300,w_300/v1727203385/run-logger/shoes/70C431B4-66F5-49C5-AA2A-CFA1F528837D_bt5uqm.jpg'
        const newShoe = await shoeModel.create({ owner: userName, brand: 'No shoes', model: 'Barefoot', photoURL, isDefault: true, totalRun: 0 })

        const newUser = await userModel.create({ userName, email, password: hashedPassword, shoes: [newShoe._id] })

        return res.send({ msg: 'User registered successfully.', newUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const logUserIn = async (req, res) => {
    try {
        const { userName, password } = req.body

        if (!userName || !password) return res.send({ msg: 'Both username and password are required to log in.' })

        let foundUser = await userModel.findOne({ userName })

        if (!foundUser) return res.send({ msg: 'User not found.' })

        const isPasswordValid = await bcrypt.compare(password, foundUser.password)

        if (!isPasswordValid) return res.send({ msg: 'Wrong password.' })
        else {
            const payload = { id: foundUser._id, userName: foundUser.userName }
            const token = await jwt.sign(payload, secret)
            return res.send({ msg: 'Login successful.', token })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userName = req.params.username
        const theUser = await userModel.findOne({ userName })
        await theUser.populate('runs')
        await theUser.populate('shoes')

        res.json(theUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const editUserProfile = async (req, res) => {
    try {
        const userName = req.params.username
        const author = req.user.userName
        const theUser = await userModel.findOne({ userName })

        if (theUser.userName === author) {
            const { fullName, height, weight } = req.body

            theUser.fullName = fullName
            theUser.height = height
            theUser.weight = weight
    
            await theUser.save()
    
            return res.send({ msg: 'User profile is updated.', user: theUser })
        } else {
            return res.send({ msg: 'Wrong author.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

module.exports = { registerUser, logUserIn, getUserProfile, editUserProfile }