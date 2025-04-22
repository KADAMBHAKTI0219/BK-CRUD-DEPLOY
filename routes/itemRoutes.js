const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { upload } = require('../middleware/multerConfig');

router.post('/create', upload, itemController.createItem);
router.get('/get', itemController.getAllItems);
router.get('/get/:id', itemController.getItem);
router.put('/update/:id', upload, itemController.updateItem);
router.delete('/delete/:id', itemController.deleteItem);

module.exports = router;