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
        res.status(201).json({ data: item });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        console.log('Attempting to fetch items...');
        const items = await itemModel.find().limit(5).lean().exec();
        console.log('Items fetched successfully, count:', items.length);
        if (!items || items.length === 0) {
            console.log('No items found, initializing collection...');
            try {
                await itemModel.create({ title: 'Default Item', description: 'Default', price: 0, category: 'Default' }, { writeConcern: { w: 'majority' } });
                return res.status(200).json({ message: "Product Fetched Successfully", data: [{ title: 'Default Item', description: 'Default', price: 0, category: 'Default' }] });
            } catch (initError) {
                console.error('Initialization error:', initError.message);
                return res.status(500).json({ error: 'Failed to initialize collection: ' + initError.message });
            }
        }
        res.status(200).json({ message: "Product Fetched Successfully", data: items });
    } catch (error) {
        console.error('Error in getAllItems:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
};

exports.getItem = async (req, res) => {
    try {
        const item = await itemModel.findById(req.params.id).lean().exec();
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ data: item });
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
        ).lean().exec();
        
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ data: item });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await itemModel.findByIdAndDelete(req.params.id).exec();
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ data: { message: 'Item deleted successfully' } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};