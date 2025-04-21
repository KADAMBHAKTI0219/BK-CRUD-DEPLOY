// const mongoose = require("mongoose");
// const dotenv = require('dotenv')
// dotenv.config();
// const connectionToDB = mongoose.connect(process.env.MONGO_DB_URI);
// module.exports = connectionToDB;
const connectToDb = async () => 
    {
        try 
        {
            await mongoose.connect(process.env.MONGO_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("connected to db");
        }
        catch (error) 
        {
            console.log(error);
        }
    }

    module.exports = {connectToDb};