const express = require("express");
const upload = require('../middleware/upload')
const {getController,singledataController,createController,updateController,deleteController} = require('../controllers/productController')
const BookRouter = express.Router();

// ---------------------------------------------
BookRouter.get("/get", getController);

// ---------------------------------------------
BookRouter.get("/singledata/:id",singledataController)

// ---------------------------------------------
BookRouter.post("/create", createController);

// ---------------------------------------------
BookRouter.patch("/update/:id",upload.single("file") ,updateController);

// ---------------------------------------------
BookRouter.delete("/delete/:id", deleteController);

// ---------------------------------------------
module.exports = BookRouter;


// The upload.single("file") middleware is added before the updateController to handle file processing.