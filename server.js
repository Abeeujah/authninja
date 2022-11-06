// Require HTTP Module, Express App, Mongo..
const http = require('http');
const app = require('./app');
const {
    mongoConnect,
} = require('./services/mongo');

// Create Server Intricacies..
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

// Start Server..
async function startServer() {
    await mongoConnect();
    server.listen(PORT, () => {
        console.log(`Server Started on PORT ${PORT}...`);
    });
}

startServer();