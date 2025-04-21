const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();
const connectionToDB = mongoose.connect(process.env.MONGO_DB_URI, { serverSelectionTimeoutMS: 100000000 });
module.exports = connectionToDB;