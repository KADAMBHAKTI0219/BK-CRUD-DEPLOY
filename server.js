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

// MongoDB connection with enhanced options
mongoose.connect(process.env.MONGO_DB_URI, {
    serverSelectionTimeoutMS: 60000, // 60 seconds
    socketTimeoutMS: 90000, // 90 seconds
    maxPoolSize: 10, // Increase connection pool
    autoIndex: false, // Disable auto-indexing for performance
    retryWrites: true, // Enable retry on write failures
    retryReads: true // Enable retry on read failures
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err.message));

// Routes
app.use('/api/items', itemRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});