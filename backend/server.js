const express = require('express')
const db = require('./config/connection')
const cors = require('cors')
const verifyToken = require('./middleware/auth')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/user', require('./routers/user'))
app.get('/testroute', verifyToken, (req, res) => {
    return res.send('Welcome!')
})

const port = 8080

app.get('/', (req, res) => {
    res.send('Hi!')
})

app.listen(port, () => {
    console.log(`RunLogger app listening on port ${port}`)
})