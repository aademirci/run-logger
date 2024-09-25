const mongoose = require('mongoose')

const ShoeSchema = new mongoose.Schema({
    owner: String,
    brand: String,
    model: String,
    photoURL: String,
    isDefault: { type: Boolean, default: false },
    totalRun: { type: Number, default: 0 }
}, { toJSON: { virtuals: true } })

const Shoe = mongoose.model('Shoe', ShoeSchema)

module.exports = Shoe