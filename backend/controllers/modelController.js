// backend/controllers/modelController.js
const models = require('../data/models.json');

// Get all companies with basic model info
exports.getAllCompanies = (req, res) => {
  try {
    // Extract companies from the models data
    const companies = Object.values(models.companies).map(company => ({
      id: company.id,
      name: company.name,
      description: company.description,
      logo: company.logo,
      models: company.models.map(modelId => {
        const model = models.models[modelId];
        return {
          id: model.id,
          name: model.name,
          category: model.category,
          version: model.version,
          shortDescription: model.shortDescription || model.description.substring(0, 100) + '...'
        };
      })
    }));

    res.json(companies);
  } catch (error) {
    console.error('Error in getAllCompanies:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch companies' 
    });
  }
};

// Get specific company details
exports.getCompanyDetails = (req, res) => {
  try {
    const { companyId } = req.params;
    const company = models.companies[companyId];

    if (!company) {
      return res.status(404).json({ 
        success: false, 
        message: 'Company not found' 
      });
    }

    // Get full model details for this company
    const companyModels = company.models.map(modelId => {
      return models.models[modelId];
    });

    const result = {
      ...company,
      models: companyModels
    };

    res.json(result);
  } catch (error) {
    console.error(`Error in getCompanyDetails for ${req.params.companyId}:`, error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch company details' 
    });
  }
};

// Get all models (simplified info)
exports.getAllModels = (req, res) => {
  try {
    const modelsList = Object.values(models.models).map(model => ({
      id: model.id,
      name: model.name,
      category: model.category,
      version: model.version,
      companyId: model.companyId,
      companyName: models.companies[model.companyId].name
    }));

    res.json(modelsList);
  } catch (error) {
    console.error('Error in getAllModels:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch models' 
    });
  }
};

// Get specific model details
exports.getModelDetails = (req, res) => {
  try {
    const { modelId } = req.params;
    const model = models.models[modelId];

    if (!model) {
      return res.status(404).json({ 
        success: false, 
        message: 'Model not found' 
      });
    }

    // Add company name to the model info
    const result = {
      ...model,
      companyName: models.companies[model.companyId].name
    };

    res.json(result);
  } catch (error) {
    console.error(`Error in getModelDetails for ${req.params.modelId}:`, error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch model details' 
    });
  }
};