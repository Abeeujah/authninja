// Require Express and Path..
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const smoothieRouter = require('./route/recipe/recipe.route');
const {
  loginRouter,
  logoutRouter,
  signupRouter,
} = require('./route/auth/auth.route');
const {
  verifyAuth,
  checkUser,
} = require('./middleware/auth.middleware');

const app = express();

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use('/smoothies', verifyAuth, smoothieRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);

// Export App..
module.exports = app;