const Product = require('../models/productModal')

const getFilteredProducts = async (req, res) => {
    try {

        const products = await Product.find();
        res.status(200).json({
            status: 'success',
            data: products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
}

module.exports = { getFilteredProducts };