require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authModel = require('../models/auth.model')
const passport = require('passport')
const token = require('./token/index')


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log(profile)

        const user = await authModel.createUserIfNotExists(profile)
        // console.log(user.userId)
        token.createToken(user.userId)
        return cb(null, profile);
    }
));