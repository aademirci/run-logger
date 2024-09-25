const  mongoose = require('mongoose')

const ShoeListSchema = new mongoose.Schema({
    brand: String,
    model: String
}, { collection: 'shoelist', toJSON: { virtuals: true } })

const ShoeList = mongoose.model('ShoeList', ShoeListSchema)

module.exports = ShoeList