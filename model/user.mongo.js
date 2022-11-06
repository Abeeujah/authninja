// Require Mongoose, Validator and Bcrypt..
const mongoose = require('mongoose');
const {
    isEmail
} = require('validator');
const bcrypt = require('bcrypt');

// Create User Schema..
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email Address is Required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please Enter a Valid Email Address'],
    },
    password: {
        type: String,
        required: [true, 'Password Required to Authenticate You'],
        minlength: [6, 'Password cannot be shorter than 6 characters'],
    }
});

// Use Mongo middleware to hash Passwords..
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// // Create Login Function in Schema Statics..
// userSchema.statics.login = async function (email, password) {
//     const user = await this.find({ email });
//     if(user) {
//         const auth = await bcrypt.compare(password, user.password);
//         if(auth) {
//             return user
//         } else {
//             throw new Error('Incorrect Password');
//         }
//     }
//     throw new Error('Invalid Email Address');
// }

// Create User Model..
const userModel = mongoose.model('User', userSchema);

// Export User Model and Schema..
module.exports = {
    userSchema,
    userModel,
};