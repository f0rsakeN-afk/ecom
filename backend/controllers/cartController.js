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
        const { userId } = req.params
        if (!userId) {
            res.status(400).json({
                status: 'failed',
                message: 'UserId is required'
            })
        }
        const cart = await Cart.findOne({ userId }).populate({
            path: 'item.productId',
            select: 'image titlesalePrice salePrice'
        })

        if (!cart) {
            return res.status(404).json({
                status: 'failed',
                message: 'Cart not found'
            })
        }

        const validItems = cart.items.filter(productItem => productItem.productId);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }
        const populateCartItems = validItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity
        }));
        res.status(200).json({
            status: 'success',
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })
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
        const { userId, product, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                status: 'success',
                message: 'Invalid data provided'
            })
        }
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                status: 'failed',
                message: 'Cart not found'
            })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                status: 'failed',
                message: 'Cart items not present'
            })
        }
        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();
        await cart.populate({
            path: 'items.productId',
            select: "image title price salePrice"
        })


        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.image ? item.productId.image : null,
            title: item.title ? item.productId.title : 'Product not found',
            price: item.price ? item.productId.price : null,
            salePrice: item.salePrice ? item.productId.salePrice : null,
            quantity: item.quantity
        }));
        res.status(200).json({
            status: 'success',
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })
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