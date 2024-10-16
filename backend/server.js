const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')


dotenv.config({ path: './config.env' })

const port = process.env.PORT || 3000;
const DB = process.env.DB
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = DB.replace('<db_password>', DB_PASSWORD);


mongoose.connect(DB_URL).then(() => {
    console.log(`DB connection successful`)
}).catch((er) => console.log(er))

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
