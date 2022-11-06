// Require Mongoose..
const mongoose = require('mongoose');

// Declare Mongo Uri..
const dbURI = 'mongodb+srv://Nasa:d2jdb4paDwwVhfRm@nasa-api.yzyuv9w.mongodb.net/';

// Event Listeners..
mongoose.connection.once('open', () => {
    console.log('Database Successfully Connected');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

// database connection
async function mongoConnect() {
    await (mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }));
}

async function mongoDisconnect() {
    await (mongoose.disconnect());
}

// Export Database Connection..
module.exports = {
    mongoConnect,
    mongoDisconnect,
};