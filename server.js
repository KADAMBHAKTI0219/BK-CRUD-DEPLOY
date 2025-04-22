const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection with explicit options and error handling
const connectWithRetry = () => {
    mongoose.connect(process.env.MONGO_DB_URI, {
        serverSelectionTimeoutMS: 60000, // 60 seconds
        socketTimeoutMS: 90000, // 90 seconds
        maxPoolSize: 10,
        autoIndex: false,
        retryWrites: true,
        retryReads: true
    }).then(() => {
        console.log('MongoDB connected successfully');
    }).catch(err => {
        console.error('MongoDB connection error:', err.message);
        // Retry connection after 5 seconds
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Event listener for connection errors
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error event:', err.message);
});

// Routes
app.use('/api/items', itemRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});