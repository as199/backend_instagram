const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const imageMiddleware = require('../middleware/image.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware.checkIsAuthenticated, userController.getAllUsers);

router.post('/',imageMiddleware, authMiddleware.checkIsAuthenticated, userController.createUser);

router.put('/:userId',imageMiddleware,  authMiddleware.checkIsAuthenticated, userController.updateUser);

router.get('/:userId', authMiddleware.checkIsAuthenticated, userController.getUserById);

router.get('/profil',authMiddleware.checkIsAuthenticated, userController.getUserById);

router.delete('/:userId',authMiddleware.checkIsAuthenticated, userController.deleteUser);




module.exports = router;