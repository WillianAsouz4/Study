const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    Age: Number,
    email: String,
    password: String,
})

const Model = mongoose.model('customers', schema)

module.exports = mongoose.model