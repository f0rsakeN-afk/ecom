import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


const initialState = {
    cartItems: [],
    isLoading: false
}


export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity }) => {
    const response = await axios.post('http://localhost:3000/api/v1/cart/add', { userId, productId, quantity })
    return response.data;
})


export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
    const response = await axios.get(`http://localhost:3000/api/v1/cart/get/${userId}`)
    return response.data;
})


export const deleteCartItem = createAsyncThunk('/cart/deleteCartItem', async ({ userId, productId }) => {
    const response = await axios.delete(`http://localhost:3000/api/v1/cart/${userId}/${productId}`)
    return response.data;
})

export const updateCartQuantity = createAsyncThunk('cart/updateCartQuantity', async ({ userId, productId, quantity }) => {
    const response = await axios.put('http://localhost:3000/api/v1/cart/update-cart', { userId, productId, quantity })
    return response.data;
})


const shoppingCartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})