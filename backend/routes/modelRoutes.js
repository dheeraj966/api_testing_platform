// backend/routes/modelRoutes.js
const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');

// Get all companies
router.get('/companies', modelController.getAllCompanies);

// Get specific company details
router.get('/companies/:companyId', modelController.getCompanyDetails);

// Get all models
router.get('/models', modelController.getAllModels);

// Get specific model details
router.get('/models/:modelId', modelController.getModelDetails);

module.exports = router;