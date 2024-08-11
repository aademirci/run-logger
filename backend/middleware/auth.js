const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const secret = process.env.APP_SECRET

const verifyToken = async (req, res, next) => {
    const headers = req.headers.authorization
    
    if (headers) {
        const clientToken = headers.split(' ')[1]

        try {
            const verifiedToken = await jwt.verify(clientToken, secret)

            req.user = verifiedToken
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({ error: 'Failed to authenticate token' })
        }
    } else {
        return res.status(401).json({ error: 'Token not found.' })
    }
}

module.exports = verifyToken