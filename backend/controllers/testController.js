// backend/controllers/testController.js
const models = require('../data/models.json');
const apiConnectors = require('../utils/apiConnectors');

// Test API connection
exports.testConnection = async (req, res) => {
  try {
    const { modelId, apiKey } = req.body;
    
    if (!modelId || !apiKey) {
      return res.status(400).json({
        success: false,
        message: 'Model ID and API key are required'
      });
    }
    
    const model = models.models[modelId];
    
    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Model not found'
      });
    }
    
    const startTime = Date.now();
    
    // Get the appropriate connector for this model
    const connector = apiConnectors.getConnector(model.provider);
    
    if (!connector) {
      return res.status(500).json({
        success: false,
        message: `No connector available for ${model.provider}`
      });
    }
    
    // Test the connection
    const result = await connector.testConnection(apiKey, model);
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    res.json({
      success: true,
      message: 'Connection successful',
      time: responseTime
    });
  } catch (error) {
    console.error('Error in testConnection:', error);
    
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Failed to test connection'
    });
  }
};

// Manual test request
exports.manualTest = async (req, res) => {
  try {
    const { modelId, apiKey, prompt } = req.body;
    
    if (!modelId || !apiKey || !prompt) {
      return res.status(400).json({
        success: false,
        message: 'Model ID, API key, and prompt are required'
      });
    }
    
    const model = models.models[modelId];
    
    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Model not found'
      });
    }
    
    // Get the appropriate connector for this model
    const connector = apiConnectors.getConnector(model.provider);
    
    if (!connector) {
      return res.status(500).json({
        success: false,
        message: `No connector available for ${model.provider}`
      });
    }
    
    // Send the test request
    const result = await connector.sendRequest(apiKey, model, prompt);
    
    res.json({
      success: true,
      response: result.response
    });
  } catch (error) {
    console.error('Error in manualTest:', error);
    
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Failed to process manual test'
    });
  }
};