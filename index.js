const express = require('express');
const cors = require('cors');
const dotenv= require('dotenv');
const path = require('path');
const ProductRouter = require('./routes/productRoutes');
const { connectToDb } = require('./config/db');
dotenv.config()
const app = express()
app.use(express.json());
app.use(cors({
    origin:  ["http://localhost:5173","http://localhost:5174","http://localhost:5175","http://localhost:3000","http://localhost:3001","http://localhost:3002"],   
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credential:true
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products',ProductRouter)

connectToDb()

app.listen(process.env.PORT || 3000,async()=>{
    
        console.log(`Server is running on Port ${process.env.PORT || 3000}`);
})