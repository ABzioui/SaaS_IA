const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { auth } = require('../middlewares/auth');
const { upload } = require('../services/documentService');

// Get all properties with filters and pagination
router.get('/', auth, propertyController.getProperties);

// Get single property
router.get('/:id', auth, propertyController.getProperty);

// Create property
router.post('/', auth, propertyController.createProperty);

// Update property
router.put('/:id', auth, propertyController.updateProperty);

// Delete property
router.delete('/:id', auth, propertyController.deleteProperty);

// Upload document
router.post('/:id/documents', auth, upload.single('document'), propertyController.uploadDocument);

// Delete document
router.delete('/:id/documents/:documentId', auth, propertyController.deleteDocument);

// Update property status
router.patch('/:id/status', auth, propertyController.updateStatus);

module.exports = router; 