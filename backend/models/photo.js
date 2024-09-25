const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
    url: String,
    title: String,
    description: String
}, { toJSON: { virtuals: true } })

const Photo = mongoose.model('Photo', PhotoSchema)

module.exports = Photo