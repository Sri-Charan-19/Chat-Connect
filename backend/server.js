// server.js
const express = require('express');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Define routes
app.use('/messages', messageRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
