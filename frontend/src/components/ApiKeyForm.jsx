// src/components/ApiKeyForm.jsx
import React, { useState } from 'react';

function ApiKeyForm({ onSubmit }) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    onSubmit(apiKey);
  };

  return (
    <div className="api-key-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="apiKey">API Key</label>
          <div className="input-with-toggle">
            <input
              type={showKey ? 'text' : 'password'}
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="api-key-input"
            />
            <button 
              type="button" 
              className="toggle-visibility"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <small className="form-hint">Your API key is never stored on our servers</small>
        </div>
        <button 
          type="submit" 
          className="submit-btn"
          disabled={!apiKey.trim()}
        >
          Test Connection
        </button>
      </form>
    </div>
  );
}

export default ApiKeyForm;