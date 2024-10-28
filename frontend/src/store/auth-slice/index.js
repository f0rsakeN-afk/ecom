import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}


export const registerUser = createAsyncThunk('/auth/register', async (formData) => {
    const response = await axios.post(`http://localhost:3000/api/v1/users/register`, formData, { withCredentials: true });
    return response.data;
})


export const loginUser = createAsyncThunk('/auth/login', async (formData) => {
    const response = await axios.post(`http://localhost:3000/api/v1/users/login`, formData, { withCredentials: true });
    return response.data;
})

export const checkAuth = createAsyncThunk('/auth/checkauth', async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/users/check-auth`, {
        withCredentials: true,
        headers: {
            'Cache-Control': 'no-store,no-cache,must-revalidate,proxy-revalidate',
            Expires: '0'
        }
    });
    return response.data;
})



export const logoutUser = createAsyncThunk('/auth/logout', async () => {
    const response = await axios.post(`http://localhost:3000/api/v1/users/logout`, {}, { withCredentials: true });
    return response.data;
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => { }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.status === 'success' ? action.payload.user : null;
            state.isAuthenticated = action.payload.status === 'success' ? true : false;
        }).addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(checkAuth.pending, (state) => {
            state.isLoading = true
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.status === 'success' ? action.payload.user : null;
            state.isAuthenticated = action.payload.status === 'success' ? true : false;
        }).addCase(checkAuth.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        })
    }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

