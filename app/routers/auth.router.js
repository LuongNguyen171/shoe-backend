const express = require('express')
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/token');
// const tokenVeri = require('../../middlewares/token')


require('dotenv').config


router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);


router.get('/google', authController.googleLogin);

router.get('/google/callback', authController.googleCallback,
    authController.googleReturnClientURL)

// router.post('/login-success', authController.loginSuccess)

// forgot password route

// router.get('/forgot-password', authController.showForgotPassword)
router.post('/forgot-password', authController.forgotPassword)
//update user data
router.post('/updateInformation', authController.updateDataUser)
//reset password route
router.post('/reset-password', authController.resetPassword)
//update password route
router.post('/update-password', verifyToken, authController.updatePassword)

router.get('/personal-information', verifyToken, authController.informationCustomer)

module.exports = router