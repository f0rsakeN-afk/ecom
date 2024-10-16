const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'An email address is required']
    },
    password: {
        type: String,
        required: [true, 'A password is required'],
        minlength: [6, 'Password must be of at least 6 characters']
    },
    role: {
        type: String,
        default: 'user'
    }
})



const User = mongoose.model('users', userSchema);
module.exports = User;