const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const secret = process.env.APP_SECRET

const verifyToken = async (req, res, next) => {
    let headers = req.headers.authorization
    
    if (headers) {
        const clientToken = headers.split(' ')[1]
        const verifiedToken = await jwt.verify(clientToken, secret)

        if (!verifiedToken) return res.send({ msg: 'Invalid token.' })
        else {
            req.user = verifiedToken
            next()
        }
    } else {
        return res.send({ msg: 'Token not found.' })
    }
}

module.exports = verifyToken