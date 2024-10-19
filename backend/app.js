const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

app.use(express.json())



app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
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

module.exports = app;
