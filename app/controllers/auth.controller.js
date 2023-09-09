const passport = require('passport');

const bcrypt = require('bcrypt');
const userModel = require('../models/auth.model')
const token = require('../middlewares/token');

exports.registerUser = async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body
        const existingUser = await userModel.getUserByEmail(userEmail)

        if (existingUser) {
            return res.status(400).json({ message: " this isPassword:isPassword Email registered!" })

        } else {
            const hashedPassword = await bcrypt.hash(userPassword, 10)
            const newUser = { userName, userEmail, userPassword: hashedPassword }
            await userModel.createUser(newUser)
            const createToken = token.createToken(userEmail)
            // res.setHeader('Can2', token)
            res.status(201).json({ message: 'User registered successfully', createToken })

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An error has occurred when registering user' })
    }
}

exports.loginUser = async (req, res) => {

    try {
        const { userEmail, userPassword } = req.body
        const user = await userModel.getUserByEmail(userEmail)
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        } else {
            const isPassword = await bcrypt.compare(userPassword, user.userPassword)
            if (!isPassword) {
                return res.status(404).json({ message: 'password incorrect' })

            } else {
                const createToken = token.createToken(userEmail);
                return res.status(200).json({ message: 'Login successful', createToken })
            }
        }

    } catch (error) {
        console.log(error)

        res.status(500).json({ message: 'An error has occurred while logging in' });
    }

}

exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'], session: false });

exports.googleCallback = (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
        req.user = profile
        profile.password = profile.emails[0].value
        console.log(profile)
        next()
    })(req, res, next)
}

exports.googleReturnClientURL = (req, res) => {
    const userEmail = req.user.emails[0].value;
    console.log(userEmail)
    const createToken = token.createToken(userEmail)
    res.redirect(`${process.env.URL_CLIENT}?token=${createToken}`)
}

//forgot password controller

exports.forgotPassword = async (req, res) => {
    let email = req.body.userEmail;
    let user = await userModel.getUserByEmail(email)

    try {
        host = req.header("host")
        const resettLink = `${req.protocol}://${process.env.HOST_CLIENT}/user/reset-password?token=${token.createToken(email)}&email=${email}`
        const { sendForgotPasswordMail } = require('./mail.controller')

        sendForgotPasswordMail(user, host, resettLink)
        return res.status(200).json({ message: "this mail has been sent!. please check your email" })

    } catch (error) {
        console.log(error)

        return res.status(404).json({ message: 'this email not exist or email information isPassword:isPassword in incorect!' });

    }

}

exports.updatePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await userModel.getUserByEmail(email)

        if (user) {

            const isPassword = await bcrypt.compare(oldPassword, user.userPassword)
            if (isPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, 10)
                const result = await userModel.updateUserPassword(email, hashedPassword)
                return res.status(200).json({ message: 'update password successfully', isPassword })
            } else {
                return res.status(200).json({ message: 'password incorect', isPassword })
            }
        } else {
            return res.status(404).json({ message: 'user not found' })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "can't update" })

    }

}

exports.resetPassword = async (req, res) => {
    try {
        const email = req.query.email
        const token = req.query.token
        const newPassword = req.query.newPassword

        const { verifyTokenDirect } = require('../middlewares/token/index')

        // console.log('email: ', email)
        // console.log('verytoken: ', verifyTokenDirect(token))
        // console.log('istoken: ', token)

        if (!token || !verifyTokenDirect(token)) {
            return res.status(401).json({ message: "token has expired" })

        } else {
            const bcrypt = require('bcrypt');
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            await userModel.updateUserPassword(email, hashedPassword)

            return res.status(200).json({ message: "updated password successfully!" })

        }
    } catch (error) {
        return res.status(404).json({ message: "an error has occurred" })

    }

}

exports.informationCustomer = async (req, res) => {
    try {
        const { iss, sub } = req.payload
        const user = { iss, sub }
        const userDatabase = await userModel.getUserByEmail(user.sub)

        return res.status(200).json({ message: "access successfully!", userDatabase })

    } catch (error) {
        return res.status(404).json({ message: "an error has occurred" })
    }

}
exports.updateDataUser = async (req, res) => {
    try {
        const { userPhoneNumber, userAddress, userEmail } = req.body
        const isUpdated = await userModel.updateDataUser(userPhoneNumber, userAddress, userEmail)
        return res.status(200).json({ message: 'update data successfully!', isUpdated })

    } catch (error) {
        return res.status(404).json({ message: "an error has occurred", isUpdated })

    }
}

exports.loginSuccess = () => { }