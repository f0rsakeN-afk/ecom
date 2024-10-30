const User = require('../models/userModal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    const { userName, email, password } = req.body;
    try {

        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.json({
                status: 'failed',
                message: 'User with that email address already exists'
            })
        }


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
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email })
        if (!checkUser) {
            return res.status(400).json({
                status: 'failed',
                message: `The user with this email address doesn't exist. Please register first.`
            })
        }
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)

        if (!checkPasswordMatch) {
            return res.status(400).json({
                status: 'failed',
                message: 'Incorrect password! Please try again'
            })
        }

        const token = jwt.sign({
            id: checkUser._id, role: checkUser.role, email: checkUser.email, userName: checkUser.userName
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })


        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            status: 'success',
            message: 'Logged in successfully',
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'failed',
            message: 'Some error occurred'
        })
    }
}



const logout = (req, res) => {
    res.clearCookie('token').json({
        status: 'success',
        message: 'Logged out successfully'
    })
}


const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({
        status: 'failed',
        message: 'Unauthorized user'
    })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({
            status: 'failed',
            message: 'Unauthorized user'
        })
    }
}

module.exports = { register, login, logout, authMiddleware }