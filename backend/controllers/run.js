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

module.exports = { createRun }