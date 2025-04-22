const bookModel = require("../models/Product");


const getController = async (req, res) => 
{
    // console.log("hello getController");

    try 
    {
        const books = await bookModel.find();
        res.status(200).json(books);
    }
    catch (error) 
    {
        res.status(400).json({ message: "Books Not Found !" });
    }

};

const singledataController = async (req, res) => 
{
    // console.log("hello singledataController");

    const { id } = req.params
    try 
    {
        const data = await bookModel.findById(id)
        return res.status(200).json(data);
    }
    catch (error) 
    {
        return res.status(400).json({ message: "Error in fetching books data" });
    }

};

const createController = async (req, res) => 
{
    // console.log("hello createController");

    try 
    {
        const { ISBN } = req.body;
        const existingBook = await bookModel.findOne({ ISBN });

        if (existingBook) 
        {
            return res.status(400).json({ message: "Book with this ISBN already exists!" });
        }
        const book = new bookModel(req.body);
        await book.save();
        res.status(200).json({ message: "Book Added Successfully!" });
    }
    catch (error) 
    {
        console.error("Error adding book:", error);
        res.status(400).json({ message: "Not Added!" });
    }

};

const updateController = async (req, res) => 
{
    // console.log("hello updateController");

    const { id } = req.params;
    try 
    {
        let updateData = {...req.body};

        if(req.file)
        {
            updateData.filePath = req.file.path;
        }

        const updatedBook = await bookModel.findByIdAndUpdate(id, {$set: updateData }, {new:true})
        if (!updatedBook) 
        {
            return res.status(400).json({ message: "Not Updated!" });
        }
        else 
        {
            res.status(200).json({ message: "Book Updated Successfully !" })
        }
    }
    catch (error) 
    {
        console.log(error)
        res.status(400).json({ message: "Error updating book" });
    }

};

const deleteController = async (req, res) => 
{
    // console.log("hello deleteController");

    const { id } = req.params;
    try 
    {
        const deletedBook = await bookModel.findByIdAndDelete(id);
        if (!deletedBook) 
        {
            return res.status(400).json({ message: "Book not deleted !" })
        }
        else 
        {
            res.status(200).json({ message: "Book deleted Successfully !" })
        }
    }
    catch (error) 
    {
        console.log(error);
        res.status(400).json({ message: "Error to delete book" });
    }



};

module.exports = { getController, singledataController, createController, updateController, deleteController };

// for multer:-
// Check if req.file exists (indicating a file was uploaded).
// Add the file's path (req.file.path) to the updateData object, which is used to update the database.