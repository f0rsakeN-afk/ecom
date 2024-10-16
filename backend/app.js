const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')

app.use(express.json({ limit: '10kb' }))

app.use(cors({
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        'Content_type',
        "Authorization",
        "Cache-control",
        "Expires",
        "Pragma",
    ],
    credentials: true
}))


app.use(cookieParser());


app.use('/api/v1/users', userRoutes)

module.exports = app;
