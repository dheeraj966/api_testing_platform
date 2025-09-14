// src/components/TestResult.jsx
import React from 'react';

function TestResult({ result }) {
  const getStatusIcon = () => {
    switch (result.status) {
      case 'loading':
        return (
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        );
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="success-icon">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="error-icon">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getMessage = () => {
    if (result.status === 'loading') {
      return 'Testing API connection...';
    }
    return result.message;
  };

  return (
    <div className={`test-result ${result.status}`}>
      <div className="status-icon">
        {getStatusIcon()}
      </div>
      <div className="result-info">
        <p className="result-message">{getMessage()}</p>
        {result.time && (
          <p className="result-time">Response time: {result.time}ms</p>
        )}
      </div>
    </div>
  );
}

export default TestResult;