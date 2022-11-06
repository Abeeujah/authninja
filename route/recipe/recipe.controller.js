// HTTP Routes..
function getSmoothies(req, res) {
    return (res.status(200).render('smoothies'));
}

// Export HTTP Routes..
module.exports = {
    getSmoothies,
};