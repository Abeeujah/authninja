// Require Express and Controller..
const express = require('express');
const {
    getLogin,
    postLogin,
    getLogout,
    getSignUp,
    postSignUp,
} = require('./auth.controller');

// Create Router..
const loginRouter = express.Router();
const logoutRouter = express.Router();
const signupRouter = express.Router();

// Route Controllers..
loginRouter.get('/', getLogin);
loginRouter.post('/', postLogin);
logoutRouter.get('/', getLogout);
signupRouter.get('/', getSignUp);
signupRouter.post('/', postSignUp);

// Export Routers..
module.exports = {
    loginRouter,
    logoutRouter,
    signupRouter,
};