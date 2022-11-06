// Require JWT..
const jwt = require('jsonwebtoken');
const { userModel } = require('../model/user.mongo');

// Create Auth Middleware..
async function verifyAuth(req, res, next) {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, 'makanakiikanakam', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

// Current User Middleware..
async function checkUser(req, res, next) {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, 'makanakiikanakam', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await userModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

// Export Auth Middleware..
module.exports = {
    verifyAuth,
    checkUser,
}