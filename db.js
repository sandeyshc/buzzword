const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://Orders:Orders@cluster0.lminx.mongodb.net/Orders?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(resp => {
        console.log("MongoDB connected")
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db