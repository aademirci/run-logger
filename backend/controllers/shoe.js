const shoeModel = require('../models/shoe')
const shoeListModel = require('../models/shoelist')
const userModel = require('../models/user')
const cloudinary = require('cloudinary')
const cloudinaryConfig = require('../config/cloudinary-config')

const getShoes = async (req, res) => {
    try {
        const shoesId = req.params.id
        const theShoes = await shoeModel.findById(shoesId)

        if (theShoes) {
            res.json(theShoes)
        } else {
            return res.send({ msg: 'Shoes are not found.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const createShoes = async (req, res) => {
    try {
        const newShoes = req.body
        const shoesPhoto = req.file.path

        const uploadResult = await cloudinary.v2.uploader.upload(shoesPhoto, {
            folder: 'run-logger/shoes',
            transformation: { width: 300, height: 300, crop: 'fill' }
        })

        const createdShoes = await shoeModel.create({ ...newShoes, photoURL: uploadResult.secure_url, owner: req.user.userName })
        const theOwner = await userModel.findOne({ userName: createdShoes.owner })

        const shoesInList = await shoeListModel.findOne({ brand: createdShoes.brand, model: createdShoes.model })

        if (!shoesInList) {
            await shoeListModel.create({ brand: createdShoes.brand, model: createdShoes.model })
        }

        if (theOwner) {
            theOwner.shoes.push(createdShoes)
            theOwner.save()
            return res.send({ msg: 'Shoes added successfully.', shoes: createdShoes })
        } else {
            return res.send({ msg: 'Owner is not available.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const editShoes = async (req, res) => {
    try {
        const shoesId = req.params.id
        const shoesPhoto = req.file ? req.file.path : null
        const owner = req.user.userName

        const selectedShoes = await shoeModel.findById(shoesId)
        if (selectedShoes.owner === owner) {
            const editedShoes = req.body
            
            await shoeModel.findByIdAndUpdate(shoesId, editedShoes)

            if (shoesPhoto !== null) {
                const uploadResult = await cloudinary.v2.uploader.upload(shoesPhoto, {
                    folder: 'run-logger/shoes',
                    transformation: { width: 300, height: 300, crop: 'fill' }
                })
                await shoeModel.findByIdAndUpdate(shoesId, { photoURL: uploadResult.secure_url })
            }

            const shoesInList = await shoeListModel.findOne({ brand: editedShoes.brand, model: editedShoes.model })

            if (!shoesInList) {
                await shoeListModel.create({ brand: editedShoes.brand, model: editedShoes.model })
            }

            return res.send({ msg: 'Shoes are edited.', shoes: {...editedShoes, owner} })
        } else {
            return res.send({ msg: 'Wrong author.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const deleteShoes = async (req, res) => {
    try {
        const shoesId = req.params.id
        const owner = req.user.userName

        const selectedShoes = await shoeModel.findById(shoesId)
        if (selectedShoes.owner === owner) {
            await shoeModel.findByIdAndDelete(shoesId)
            const theOwner = await userModel.findOne({ userName: owner })
            const index = theOwner.shoes.indexOf(selectedShoes._id)
            theOwner.shoes.splice(index, 1)
            theOwner.save()
            return res.send({ msg: 'Shoes are deleted.' })
        } else {
            return res.send({ msg: 'Wrong author.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

module.exports = { getShoes, createShoes, editShoes, deleteShoes }