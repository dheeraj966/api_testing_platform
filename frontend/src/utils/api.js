// src/utils/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch all AI companies
export const fetchAllCompanies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/companies`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

// Fetch details for a specific company
export const fetchCompanyDetails = async (companyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/companies/${companyId}`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching company details for ${companyId}:`, error);
    throw error;
  }
};

// Fetch details for a specific model
export const fetchModelDetails = async (modelId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/models/${modelId}`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching model details for ${modelId}:`, error);
    throw error;
  }
};

// Test API connection
export const testApiConnection = async (modelId, apiKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/test/connection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelId,
        apiKey,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error testing API connection for ${modelId}:`, error);
    throw error;
  }
};

// Send manual test request
export const sendManualTestRequest = async (modelId, apiKey, prompt) => {
  try {
    const response = await fetch(`${API_BASE_URL}/test/manual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelId,
        apiKey,
        prompt,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error sending manual test for ${modelId}:`, error);
    throw error;
  }
};