require("dotenv").config();
const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const { Server } = require("socket.io");

const handleRequests = require("./middlewares/handleRequests");
const { connectDatabase } = require("./config/dbConnection");
const { initNotificationService } = require("./helper/notifications");

const app = express();

// Apply middlewares
app.use(helmet());
app.use(cors({
    origin: "https://insyd-notification-client-service.vercel.app/",
    methods: "*", // ✅ Allow all HTTP verbs
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register Routes
handleRequests(app);

// Connect DB and start server
connectDatabase().then(() => {
    // Start HTTP Server
    const httpServer = app.listen(3000, () => {
        console.log(`🚀 Server running on port 3000`);
    });
    // Setup WebSocket server with unrestricted CORS
    const socketServer = new Server(httpServer, {
        pingTimeout: 100000,
        cors: {
            origin: "*",
        },
    });

    // Handle WebSocket connections
    socketServer.on("connection", (clientSocket) => {
        clientSocket.on("register-user", (userId) => {
            clientSocket.join(userId);
            console.log(`User ${userId} connected to notifications`);
        });
    });

    // Initialize notification service
    initNotificationService(socketServer);

}).catch((err) => {
    console.error("❌ Failed to connect to database:", err);
});

module.exports = app;
