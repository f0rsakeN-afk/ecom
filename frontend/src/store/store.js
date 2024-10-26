import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductReducer from './admin/productSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductReducer
    }
})

export default store;