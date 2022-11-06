// Require User Model..
const bcrypt = require('bcrypt');
const {
    userModel,
} = require('./user.mongo');

// Error Handling..
function errorHandler(err) {
    const errors = {
        email: '',
        password: '',
    };
    // Login..
    if (err.message === 'Email Address Not Registered') {
        errors['email'] = err.message;
    }
    if (err.message === 'Incorrect Password') {
        errors['password'] = err.message;
    }
    // Sign Up..
    if (err.code === 11000) {
        errors['email'] = 'Email Address Already Exists';
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

// Database CRUD..
async function createUser(req) {
    try {
        const { email, password } = req.body;
        return await (userModel.create({ email, password }));
    } catch (err) {
        return errorHandler(err);
    }
}

async function loginUser(req) {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error('Email Address Not Registered');
        }
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (!auth) {
                throw new Error('Incorrect Password');
            }
            return user;
        }
    } catch (err) {
        return errorHandler(err)
    }
}

// Export CRUD Function..
module.exports = {
    createUser,
    loginUser,
}