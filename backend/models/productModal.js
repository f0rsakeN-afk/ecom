const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number
}, { timestamps: true })


const Products = mongoose.model('products', productSchema)
module.exports = Products;