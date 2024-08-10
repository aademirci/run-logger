const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const URL = process.env.MONGODB_URI

main().then(() => console.log('DB connected successfully')).catch(err => console.log(err))

async function main() {
    await mongoose.connect(URL)
}

module.exports = main