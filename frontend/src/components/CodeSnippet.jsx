// src/components/CodeSnippet.jsx
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeSnippet({ title, language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="code-snippet">
      <div className="snippet-header">
        <h4>{title}</h4>
        <button 
          className="copy-btn"
          onClick={handleCopy}
        >
          {copied ? (
            <span className="copied">Copied!</span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
          )}
        </button>
      </div>
      
      <div className="snippet-content">
        <SyntaxHighlighter 
          language={language} 
          style={vscDarkPlus}
          customStyle={{ 
            margin: 0, 
            borderRadius: '0 0 4px 4px',
            fontSize: '14px'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeSnippet;