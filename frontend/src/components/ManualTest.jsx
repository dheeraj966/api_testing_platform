// src/components/ManualTest.jsx
import React, { useState } from 'react';
import { sendManualTestRequest } from '../utils/api';

function ManualTest({ modelId, apiKey, modelType }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await sendManualTestRequest(modelId, apiKey, prompt);
      setResponse(result.response);
    } catch (err) {
      setError(err.message || 'An error occurred while testing the model.');
      setResponse('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manual-test">
      <h3>Manual API Testing</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="prompt">Your Prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={modelType === 'chat' 
              ? "Enter your message to the AI..." 
              : modelType === 'image' 
                ? "Describe the image you want to generate..." 
                : "Enter your prompt..."
            }
            rows={5}
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={!prompt.trim() || loading}
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </form>
      
      {loading && (
        <div className="loading-response">
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
          <p>Waiting for response...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {response && !loading && !error && (
        <div className="response-container">
          <h4>Response</h4>
          <div className="response-content">
            {modelType === 'image' ? (
              <img src={response} alt="Generated image" className="generated-image" />
            ) : (
              <pre>{response}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ManualTest;