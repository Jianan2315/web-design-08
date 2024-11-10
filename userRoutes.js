const express = require('express');
const router = express.Router();
const userController = require('./userController');
const multerMiddleware = require('./multerMiddleware');

router.post('/create', userController.createUser);
router.put('/edit', userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/getAll', userController.getAllUsers);
router.post('/uploadImage', multerMiddleware.single('image'), userController.uploadImage);

module.exports = router;
