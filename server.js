const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {  ServerApiVersion } = require('mongodb');
const dotenv=require('dotenv')
dotenv.config()
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middleware
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGO_DB_URI,{
    serverApi: ServerApiVersion.v1,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/items', itemRoutes);

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});