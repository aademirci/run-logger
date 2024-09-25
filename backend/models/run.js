const mongoose = require('mongoose')

const RunSchema = new mongoose.Schema({
    runner: String,
    eventName: String,
    location: String,
    date: { type: Date, default: Date.now },
    routeLength: Number,
    duration: String,
    remarks: String,
    shoe: { type: mongoose.Schema.Types.ObjectId, ref: 'Shoe' },
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }]
}, { toJSON: { virtuals: true } })

const Run = mongoose.model('Run', RunSchema)

module.exports = Run