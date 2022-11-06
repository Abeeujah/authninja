// Require Express and Controllers..
const express = require('express');
const {
    getSmoothies,
} = require('./recipe.controller');

// Create Router..
const smoothieRouter = express.Router();

// Route Controllers..
smoothieRouter.get('/', getSmoothies);

// Export router..
module.exports = smoothieRouter;