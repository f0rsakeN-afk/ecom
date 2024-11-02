import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    productList: []
}

export const fetchAllFilteredProducts = createAsyncThunk('/shop/fetchShopProducts', async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
        ...filterParams, sortBy: sortParams
    })
    const result = await axios.get(`http://localhost:3000/api/v1/shop/get?${query}`);
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
        })
    }
})


export default shopProductSlice.reducer