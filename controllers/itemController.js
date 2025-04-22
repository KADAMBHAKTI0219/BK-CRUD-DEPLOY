const itemModel = require("../models/Item");


exports.createItem = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;
        if (!title || !description || !price || !category) {
            return res.status(400).json({ error: 'All fields (title, description, price, category) are required' });
        }
        const item = new itemModel({
            title,
            description,
            price: parseFloat(price),
            category,
            image: req.file ? `/uploads/${req.file.filename}` : ''
        });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await itemModel.find()
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getItem = async (req, res) => {
    try {
        const item = await itemModel.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;
        const updateData = { title, description, price: parseFloat(price), category };
        
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }
        
        const item = await itemModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await itemModel.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};