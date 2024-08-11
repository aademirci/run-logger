const mongoose = require('mongoose')

const RunSchema = new mongoose.Schema({
    runner: String,
    eventName: String,
    location: String,
    date: { type: Date, default: Date.now },
    routeLength: Number,
    duration: String,
    remarks: String
}, { toJSON: { virtuals: true } })

const Run = mongoose.model('Run', RunSchema)

module.exports = Run