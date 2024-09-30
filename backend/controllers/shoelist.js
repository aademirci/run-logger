const shoeListModel = require('../models/shoelist')

const getShoeBrands = async (req, res) => {
    try {
        const query = req.params.brand
        const theShoeBrands = await shoeListModel.find({ brand: { $regex: `${query}`, $options: 'i'} }).limit(10)

        res.json(theShoeBrands)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const getShoeModels = async (req, res) => {
    try {
        const query = req.params.model
        const theShoeModels = await shoeListModel.find({ model: { $regex: `${query}`, $options: 'i'} }).limit(10)

        res.json(theShoeModels)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

module.exports = { getShoeBrands, getShoeModels }