const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
})

const Product = mongoose.model('Products', schema)

module.exports = Product