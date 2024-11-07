const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const shopProductRoutes = require('./routes/shopProductRoutes')
const cartRoutes = require('./routes/cartRoutes')

app.use(express.json())



app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);


app.use(cookieParser());


app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/shop', shopProductRoutes)
app.use('/api/v1/cart', cartRoutes)

module.exports = app;
