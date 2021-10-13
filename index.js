const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()
const apiPort = process.env.PORT || 3006

const Orders = require('./routes')
const db = require('./db')
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.get('/', (req, res) => {
        res.send('Hello World!')
    })


app.use('/orders', Orders)


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))