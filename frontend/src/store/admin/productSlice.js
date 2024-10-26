import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk('/products/addNewProduct', async () => {
    const result = await axios.get('http://localhost:3000/api/v1/products', {
        headers: {
            "Content-Type": 'application/json'
        }
    })
    return result.data;
})
export const editProduct = createAsyncThunk('/products/editProduct', async ({ id, formData }) => {
    const result = await axios.put(`http://localhost:3000/api/v1/products/${id}`, formData, {
        headers: {
            "Content-Type": 'application/json'
        }
    })
    return result?.data;
})
export const deleteProduct = createAsyncThunk('/products/deleteProduct', async ({ id }) => {
    const result = await axios.post(`http://localhost:3000/api/v1/products/${id}`)
    return result.data;
})
export const getAllProduct = createAsyncThunk('/products/getAllProduct', async () => {
    const result = await axios.get('http://localhost:3000/api/v1/products/')
    return result.data;
})


const AdminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload
            console.log(action.payload.data)
        }).addCase(getAllProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = []
        })
    }
})


export default AdminProductSlice.reducer;
