// Require CRUD Functions..
const {
    createUser,
    loginUser,
} = require('../../model/user.model');
const jwt = require('jsonwebtoken');

// JWT..
const maxAge = 3 * 24 * 60 * 60;
function webToken(id) {
    return jwt.sign({ id }, 'makanakiikanakam', {
        expiresIn: maxAge,
    });
}

// HTTP Functions..
async function getLogin(req, res) {
    return (res.status(200).render('login'));
}

async function postLogin(req, res) {
    const { email, password } = req.body;
    if(!email || !password) {
        return (res.status(400).json({ error: 'Bad Request' }));
    }
    const user = await loginUser(req);
    if(!user._id) {
        return (res.status(400).json(user));
    }
    const token = webToken(user._id);
    res.cookie('jwt', token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
    })
    return (res.status(201).json({ user: user._id }));
}

async function getLogout(req, res) {
    res.cookie('jwt', '', {
        maxAge: 1,
    });
    res.redirect('/login');
}

async function getSignUp(req, res) {
    return (res.status(200).render('signup'));
}

async function postSignUp(req, res) {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).send('Error Missing Required Field, User Not Created');
    }
    const user = await createUser(req);
    if(!user._id){
        return (res.status(400).json(user));
    }
    const token = webToken(user._id);
    res.cookie('jwt', token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
    });
    return (res.status(201).json({user: user.email}));
}

// Export HTTP Functions..
module.exports = {
    getLogin,
    postLogin,
    getLogout,
    getSignUp,
    postSignUp,
};