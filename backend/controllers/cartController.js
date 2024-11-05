const Cart = require('../models/cartModal')
const Products = require('../models/productModal')

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity < 0) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid data provided'
            })
        }
        const product = await Products.findById(productId)
        if (!product) {
            return res.status(404).json({
                status: 'failed',
                message: 'Product not found'
            })
        }
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            cart.items.push(product, quantity)
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }
        await cart.save();
        res.status(200).json({
            status: 'success',
            data: cart
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

exports.fetchCartItems = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

exports.updateCartItemQuantity = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

exports.deleteCartItem = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}