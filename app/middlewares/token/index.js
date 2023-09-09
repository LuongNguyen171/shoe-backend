const JWT = require('jsonwebtoken')
require('dotenv').config

exports.createToken = (userEmail) => {

    return JWT.sign({
        iss: "Nguyen Luong",
        sub: userEmail,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)

    }, process.env.JWT_SECRET)
}

exports.verifyToken = (req, res, next) => {
    if (!req.headers['authorization']) {

        return res.status(401).json({ message: 'Unauthorized' });
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.payload = payload;
        next();
    });
};







exports.verifyTokenDirect = (token) => {
    try {
        JWT.verify(token, process.env.JWT_SECRET);
        return true

    } catch (error) {
        return false
    }
}