const express = require('express')
const router = express.Router();
const userController = require('../controllers/authController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout);


router.get('/check-auth', userController.authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        status: 'success',
        message: 'User is authenticated',
        user
    })
})

module.exports = router;