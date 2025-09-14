// backend/routes/testRoutes.js
const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// Test API connection
router.post('/connection', testController.testConnection);

// Manual test request
router.post('/manual', testController.manualTest);

module.exports = router;