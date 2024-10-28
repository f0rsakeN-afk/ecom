import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    error: null
};

// Async Thunks
export const addNewProduct = createAsyncThunk(
    "products/addNewProduct",
    async (formData, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                "http://localhost:3000/api/v1/products",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editProduct = createAsyncThunk(
    "products/editProduct",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const result = await axios.patch(
                `http://localhost:3000/api/v1/products/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async ({ id }, { rejectWithValue }) => {
        try {
            const result = await axios.delete(
                `http://localhost:3000/api/v1/products/${id}`
            );
            return { ...result.data, id };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllProduct = createAsyncThunk(
    "products/getAllProduct",
    async (_, { rejectWithValue }) => {
        try {
            const result = await axios.get("http://localhost:3000/api/v1/products/");
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const AdminProductSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get All Products
            .addCase(getAllProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data.products;
                state.error = null;
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
                state.error = action.payload?.message || "Failed to fetch products";
            })

            // Add New Product
            .addCase(addNewProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList.push(action.payload.data.newProduct);
                state.error = null;
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to add product";
            })

            // Edit Product
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedProduct = action.payload.data.updatedProduct;
                const index = state.productList.findIndex(
                    (product) => product._id === updatedProduct._id
                );
                if (index !== -1) {
                    state.productList[index] = updatedProduct;
                }
                state.error = null;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to edit product";
            })

            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = state.productList.filter(
                    (product) => product._id !== action.payload.id
                );
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to delete product";
            });
    },
});

export const { clearError } = AdminProductSlice.actions;
export default AdminProductSlice.reducer;