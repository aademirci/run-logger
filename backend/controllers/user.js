const userModel = require('../models/user')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        if (!userName || !email || !password) return res.send({ msg: 'Any of the username, email, or password are required to register.' })

        let foundUserName = await userModel.findOne({ userName })
        let foundEmail = await userModel.findOne({ email })

        if (foundUserName) return res.send({ msg: 'User with this username already exists.' })
        if (foundEmail) return res.send({ msg: 'User with this email address already exists.' })

        let hashedPassword = await bcrypt.hash(password, 10)
        let newUser = await userModel.create({ userName, email, password: hashedPassword })

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
        else return res.send({ msg: 'Login successful.' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

module.exports = { registerUser, logUserIn }