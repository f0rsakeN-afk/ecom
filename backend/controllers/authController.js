const User = require('../models/userModal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    const { userName, email, password } = req.body;
    try {

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, email, password: hashedPassword
        })

        await newUser.save()
        res.status(200).json({
            status: 'success',
            message: 'Registration successful'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'failed',
            message: 'Some error occurred'
        })
    }
}


const login = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'failed',
            message: 'Some error occurred'
        })
    }
}



module.exports = { register }