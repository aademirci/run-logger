const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    fullName: String,
    height: Number,
    weight: Number,
    runs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Run' }],
    shoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shoe' }],
    totalRun: { type: Number, default: 0 },
    avatarURL: String
}, { timestamps: true, toJSON: { virtuals: true } })

const User = mongoose.model('User', UserSchema)

module.exports = User