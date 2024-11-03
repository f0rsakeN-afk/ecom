import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
}

export const fetchAllFilteredProducts = createAsyncThunk('/shop/fetchShopProducts', async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
        ...filterParams, sortBy: sortParams
    })
    const result = await axios.get(`http://localhost:3000/api/v1/shop/get?${query}`);
    return result?.data
})

export const fetchProductDetails = createAsyncThunk('/shop/fetchProductDetails', async (id) => {
    const result = await axios.get(`http://localhost:3000/api/v1/shop/get/${id}`);
    return result?.data
})

const shopProductSlice = createSlice({
    name: 'shopProducts',
    initialState, reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data;
        }).addCase(fetchAllFilteredProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = []
        }).addCase(fetchProductDetails.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload.data;
            //console.log(action.payload.data)
        }).addCase(fetchProductDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.productDetails = null
        })
    }
})


export default shopProductSlice.reducer