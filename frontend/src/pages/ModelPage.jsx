// src/pages/ModelPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiKeyForm from '../components/ApiKeyForm';
import TestResult from '../components/TestResult';
import ManualTest from '../components/ManualTest';
import CodeSnippet from '../components/CodeSnippet';
import { fetchModelDetails, testApiConnection } from '../utils/api';

function ModelPage() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [showManualTest, setShowManualTest] = useState(false);
  const [activeTab, setActiveTab] = useState('connection');

  useEffect(() => {
    const loadModelDetails = async () => {
      try {
        const data = await fetchModelDetails(modelId);
        setModel(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load model details:", error);
        setLoading(false);
      }
    };

    loadModelDetails();
  }, [modelId]);

  const handleApiKeySubmit = async (key) => {
    setApiKey(key);
    setTestResult({ status: 'loading' });

    try {
      const result = await testApiConnection(modelId, key);
      setTestResult({
        status: result.success ? 'success' : 'error',
        message: result.message,
        time: result.time
      });
    } catch (error) {
      setTestResult({
        status: 'error',
        message: error.message || 'An error occurred while testing the connection.'
      });
    }
  };

  const toggleManualTest = () => {
    setShowManualTest(!showManualTest);
  };

  if (loading) {
    return <div className="loading">Loading model details...</div>;
  }

  if (!model) {
    return <div className="error">Model not found</div>;
  }

  return (
    <div className="model-page">
      <div className="back-link" onClick={() => navigate(`/company/${model.companyId}`)}>
        &larr; Back to {model.companyName} models
      </div>
      
      <div className="model-header">
        <h2>{model.name}</h2>
        <div className="model-meta">
          <span className="model-category">{model.category}</span>
          <span className="model-version">Version: {model.version}</span>
        </div>
        <p className="model-description">{model.description}</p>
      </div>

      <div className="model-tabs">
        <button 
          className={`tab ${activeTab === 'connection' ? 'active' : ''}`}
          onClick={() => setActiveTab('connection')}
        >
          Connection Test
        </button>
        <button 
          className={`tab ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          API Code Snippets
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'connection' && (
          <div className="connection-test-section">
            <h3>Test API Connection</h3>
            <p>Enter your API key to verify connectivity with {model.name}</p>
            
            <ApiKeyForm onSubmit={handleApiKeySubmit} />
            
            {testResult && (
              <div className="test-result-container">
                <TestResult result={testResult} />
                
                {testResult.status === 'success' && (
                  <button 
                    className="manual-test-btn"
                    onClick={toggleManualTest}
                  >
                    {showManualTest ? 'Hide Manual Testing' : 'Try Manual Testing'}
                  </button>
                )}
              </div>
            )}
            
            {showManualTest && testResult && testResult.status === 'success' && (
              <ManualTest 
                modelId={modelId} 
                apiKey={apiKey} 
                modelType={model.category}
              />
            )}
          </div>
        )}
        
        {activeTab === 'code' && (
          <div className="code-snippets-section">
            <h3>API Code Snippets</h3>
            <p>Use these code examples to integrate with {model.name} in your application</p>
            
            <div className="code-examples">
              <CodeSnippet 
                title="API Request"
                language="javascript"
                code={model.codeSnippets.request}
              />
              
              <CodeSnippet 
                title="API Response"
                language="json"
                code={model.codeSnippets.response}
              />
              
              <CodeSnippet 
                title="cURL Example"
                language="bash"
                code={model.codeSnippets.curl}
              />
              
              <CodeSnippet 
                title="Python Example"
                language="python"
                code={model.codeSnippets.python}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelPage;