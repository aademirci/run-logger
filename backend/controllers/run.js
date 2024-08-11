const runModel = require('../models/run')
const userModel = require('../models/user')

const createRun = async (req, res) => {
    try {
        const newRun = req.body
        const createdRun = await runModel.create({ ...newRun, runner: req.user.userName })
        const theRunner = await userModel.findOne({ userName: createdRun.runner })

        if (theRunner) {
            theRunner.runs.push(createdRun)
            theRunner.save()
        }

        res.json(createdRun)
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
        if (selectedRun.runner === runner) {
            const editedRun = req.body
            await runModel.findByIdAndUpdate(runId, editedRun)
            
            return res.send({ msg: 'Running event is edited.' })
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
        if (selectedRun.runner === runner) {
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

module.exports = { createRun, editRun, deleteRun }