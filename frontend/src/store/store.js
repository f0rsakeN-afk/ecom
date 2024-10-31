import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductReducer from './admin/productSlice'
import shopProductSlice from './shop/productSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductReducer,
        shopProducts: shopProductSlice
    }
})

export default store;