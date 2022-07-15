const express = require('express');
const router = express.Router();
const annonceController = require('../controllers/publication.controller');
const imageMiddleware = require('../middleware/medias.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/' , annonceController.getAllPublications);

router.get('/mes-publications' , annonceController.getAllPublicationsByMe);

router.get('/:id', authMiddleware.checkIsAuthenticated, annonceController.getPublicationById);

router.post('/', imageMiddleware, authMiddleware.checkIsAuthenticated, annonceController.createPublication);

router.put('/:id', imageMiddleware, authMiddleware.checkIsAuthenticated, annonceController.updatePublication);

router.delete('/:id',authMiddleware.checkIsAuthenticated , annonceController.deletePublication);

module.exports = router;