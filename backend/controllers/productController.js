const { imageUploadUtil } = require("../helpers/cloudinary");
const Products = require("../models/productModal");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = 'data:' + req.file.mimetype + ';base64,' + b64;
        const result = await imageUploadUtil(url);
        res.json({
            status: 'success',
            result
        })
    } catch (error) {
        res.json({
            status: 'failed',
            message: error.message
        })
    }
}

const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        const newProduct = new Products({

            image, title, description, category, brand, price, salePrice, totalStock

        })

        await newProduct.save();
        res.status(201).json({
            status: 'success',
            data: {
                newProduct
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
}

const fetchAllProducts = async (req, res) => {
    try {
        const products = await Products.find()
        res.status(200).json({
            status: 'success',
            data: {
                products
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
}

const editProduct = async (req, res) => {
    try {


        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        })

        res.status(200).json({
            status: 'success',
            data: {
                updatedProduct
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
}






module.exports = { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct };