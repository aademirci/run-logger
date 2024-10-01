const runModel = require('../models/run')
const userModel = require('../models/user')
const shoeModel = require('../models/shoe')

const getRun = async (req, res) => {
    try {
        const runId = req.params.id
        const theRun = await runModel.findById(runId)

        if (theRun) {
            res.json(theRun)
        } else {
            return res.send({ msg: 'Running event is not found.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const createRun = async (req, res) => {
    try {
        const newRun = req.body
        const createdRun = await runModel.create({ ...newRun, runner: req.user.userName })
        const theRunner = await userModel.findOne({ userName: createdRun.runner })
        const theShoes = await shoeModel.findById(newRun.shoes)

        if (theRunner) {
            theRunner.runs.push(createdRun)
            theRunner.totalRun += newRun.routeLength
            theRunner.save()
            theShoes.totalRun += newRun.routeLength
            theShoes.save()
            return res.send({ msg: 'Running activity added successfully.', run: createdRun })
        } else {
            return res.send({ msg: 'Runner is not available.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const editRun = async (req, res) => {
    try {
        const runId = req.params.id
        const runner = req.user.userName

        const selectedRun = await runModel.findById(runId)
        const theRunner = await userModel.findOne({ userName: selectedRun.runner })
        const theShoes = await shoeModel.findById(selectedRun.shoes)
        if (selectedRun.runner === runner) {
            const editedRun = req.body
            await runModel.findByIdAndUpdate(runId, editedRun)
            theShoes.totalRun += editedRun.routeLength - selectedRun.routeLength
            theRunner.totalRun += editedRun.routeLength - selectedRun.routeLength
            theShoes.save()
            theRunner.save()
            
            return res.send({ msg: 'Running event is edited.', run: {...editedRun, runner} })
        } else {
            return res.send({ msg: 'Wrong author.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const deleteRun = async (req, res) => {
    try {
        const runId = req.params.id
        const runner = req.user.userName

        const selectedRun = await runModel.findById(runId)
        const theRunner = await userModel.findOne({ userName: selectedRun.runner })
        const theShoes = await shoeModel.findById(selectedRun.shoes)
        if (selectedRun.runner === runner) {
            theRunner.totalRun -= selectedRun.routeLength
            theRunner.save()
            theShoes.totalRun -= selectedRun.routeLength
            theShoes.save()
            await runModel.findByIdAndDelete(runId)

            return res.send({ msg: 'Running event is deleted.' })
        } else {
            return res.send({ msg: 'Wrong author.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}

module.exports = { getRun, createRun, editRun, deleteRun }