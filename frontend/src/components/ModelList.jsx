// src/components/ModelList.jsx
import React from 'react';

function ModelList({ items, onItemSelect, type }) {
  return (
    <div className={`${type}-list`}>
      {items.map(item => (
        <div 
          key={item.id} 
          className={`${type}-card`}
          onClick={() => onItemSelect(item.id)}
        >
          {type === 'company' && (
            <>
              <img 
                src={item.logo || '/assets/default-company.png'} 
                alt={`${item.name} logo`} 
                className="company-logo" 
              />
              <h3>{item.name}</h3>
              <p className="model-count">{item.models.length} models available</p>
            </>
          )}
          
          {type === 'model' && (
            <>
              <h4>{item.name}</h4>
              <div className="model-meta">
                <span className="model-version">v{item.version}</span>
              </div>
              <p className="model-description">{item.shortDescription}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ModelList;