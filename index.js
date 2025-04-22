const express = require('express');
const cors = require('cors');
const dotenv= require('dotenv');
const path = require('path');
const ProductRouter = require('./routes/productRoutes');
const connectionToDB = require('./config/db')
dotenv.config()
const app = express()
app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products',ProductRouter)



app.listen(process.env.PORT || 3000,async()=>{
    try {
        await connectionToDB()
        console.log(`Server is running on Port ${process.env.PORT || 3000}`);
    } catch (error) {
        console.log(error)
    }
})