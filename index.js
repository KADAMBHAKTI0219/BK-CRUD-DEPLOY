const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors");
const BookRouter = require("./routes/productRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json())
app.use("/books", BookRouter)

const connectToDb = async () => 
{
    try 
    {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to db");
    }
    catch (error) 
    {
        console.log(error);
    }
}

connectToDb();

const PORT = 8080
app.listen(PORT, () => 
{
    console.log("Server running on PORT");
});