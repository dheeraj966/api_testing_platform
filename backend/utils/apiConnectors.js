// backend/utils/apiConnectors.js
const axios = require('axios');

// Base connector class
class ApiConnector {
  constructor(provider) {
    this.provider = provider;
  }
  
  async testConnection(apiKey, model) {
    throw new Error('Method not implemented');
  }
  
  async sendRequest(apiKey, model, prompt) {
    throw new Error('Method not implemented');
  }
}

// OpenAI connector (for ChatGPT)
class OpenAIConnector extends ApiConnector {
  constructor() {
    super('openai');
  }
  
  async testConnection(apiKey, model) {
    try {
      const response = await axios.get('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      return { success: true };
    } catch (error) {
      console.error('OpenAI connection test error:', error.response?.data || error.message);
      
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.error?.message || 'Failed to connect to OpenAI API'
      };
    }
  }
  
  async sendRequest(apiKey, model, prompt) {
    try {
      let endpoint = 'https://api.openai.com/v1/chat/completions';
      let payload = {
        model: model.modelId,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000
      };
      
      if (model.category === 'image') {
        endpoint = 'https://api.openai.com/v1/images/generations';
        payload = {
          prompt,
          n: 1,
          size: '1024x1024'
        };
      }
      
      const response = await axios.post(endpoint, payload, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (model.category === 'chat') {
        return { 
          success: true, 
          response: response.data.choices[0].message.content 
        };
      } else if (model.category === 'image') {
        return { 
          success: true, 
          response: response.data.data[0].url 
        };
      }
    } catch (error) {
      console.error('OpenAI request error:', error.response?.data || error.message);
      
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.error?.message || 'Failed to process OpenAI request'
      };
    }
  }
}

// Google connector (for Gemini)
class GoogleConnector extends ApiConnector {
  constructor() {
    super('google');
  }
  
  async testConnection(apiKey, model) {
    try {
      // For Gemini, we'll just verify the API key format since there's no specific models endpoint
      if (!apiKey || apiKey.length < 10) {
        throw {
          status: 401,
          message: 'Invalid API key format'
        };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Google connection test error:', error.message);
      
      throw {
        status: error.status || 500,
        message: error.message || 'Failed to validate Google API key'
      };
    }
  }
  
  async sendRequest(apiKey, model, prompt) {
    try {
      let endpoint = `https://generativelanguage.googleapis.com/v1/models/${model.modelId}:generateContent`;
      endpoint += `?key=${apiKey}`;
      
      const payload = {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 1000,
        }
      };
      
      const response = await axios.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return { 
        success: true, 
        response: response.data.candidates[0].content.parts[0].text 
      };
    } catch (error) {
      console.error('Google request error:', error.response?.data || error.message);
      
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.error?.message || 'Failed to process Google request'
      };
    }
  }
}

// Anthropic connector (for Claude)
class AnthropicConnector extends ApiConnector {
  constructor() {
    super('anthropic');
  }
  
  async testConnection(apiKey, model) {
    try {
      // For Anthropic, we'll validate the API key format
      if (!apiKey || !apiKey.startsWith('sk-ant-')) {
        throw {
          status: 401,
          message: 'Invalid Anthropic API key format'
        };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Anthropic connection test error:', error.message);
      
      throw {
        status: error.status || 500,
        message: error.message || 'Failed to validate Anthropic API key'
      };
    }
  }
  
  async sendRequest(apiKey, model, prompt) {
    try {
      const endpoint = 'https://api.anthropic.com/v1/messages';
      
      const payload = {
        model: model.modelId,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000
      };
      
      const response = await axios.post(endpoint, payload, {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      });
      
      return { 
        success: true, 
        response: response.data.content[0].text 
      };
    } catch (error) {
      console.error('Anthropic request error:', error.response?.data || error.message);
      
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.error?.message || 'Failed to process Anthropic request'
      };
    }
  }
}

// DeepSeek connector
class DeepSeekConnector extends ApiConnector {
  constructor() {
    super('deepseek');
  }
  
  async testConnection(apiKey, model) {
    try {
      // Basic validation for DeepSeek API key
      if (!apiKey || apiKey.length < 30) {
        throw {
          status: 401,
          message: 'Invalid DeepSeek API key format'
        };
      }
      
      return { success: true };
    } catch (error) {
      console.error('DeepSeek connection test error:', error.message);
      
      throw {
        status: error.status || 500,
        message: error.message || 'Failed to validate DeepSeek API key'
      };
    }
  }
  
  async sendRequest(apiKey, model, prompt) {
    try {
      const endpoint = 'https://api.deepseek.com/v1/chat/completions';
      
      const payload = {
        model: model.modelId,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000
      };
      
      const response = await axios.post(endpoint, payload, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return { 
        success: true, 
        response: response.data.choices[0].message.content 
      };
    } catch (error) {
      console.error('DeepSeek request error:', error.response?.data || error.message);
      
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.error?.message || 'Failed to process DeepSeek request'
      };
    }
  }
}

// Factory to get the appropriate connector
const connectors = {
  'openai': new OpenAIConnector(),
  'google': new GoogleConnector(),
  'anthropic': new AnthropicConnector(),
  'deepseek': new DeepSeekConnector()
};

exports.getConnector = (provider) => {
  return connectors[provider] || null;
};