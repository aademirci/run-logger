const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    email: String,
    password: String,
    fullName: String,
    height: Number,
    weight: Number,
    shoesBrand: String,
    shoesModel: String,
    runs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Run' }],
    totalRun: { type: Number, default: 0 }
}, { timestamps: true, toJSON: { virtuals: true } })

const User = mongoose.model('User', UserSchema)

module.exports = User