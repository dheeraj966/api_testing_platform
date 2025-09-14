// src/pages/CompanyPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModelList from '../components/ModelList';
import { fetchCompanyDetails } from '../utils/api';

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCompanyDetails = async () => {
      try {
        const data = await fetchCompanyDetails(companyId);
        setCompany(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load company details:", error);
        setLoading(false);
      }
    };

    loadCompanyDetails();
  }, [companyId]);

  const handleModelSelect = (modelId) => {
    navigate(`/model/${modelId}`);
  };

  if (loading) {
    return <div className="loading">Loading company details...</div>;
  }

  if (!company) {
    return <div className="error">Company not found</div>;
  }

  return (
    <div className="company-page">
      <div className="back-link" onClick={() => navigate('/')}>
        &larr; Back to all companies
      </div>
      
      <div className="company-header">
        <img 
          src={company.logo || '/assets/default-company.png'} 
          alt={`${company.name} logo`} 
          className="company-logo"
        />
        <div className="company-info">
          <h2>{company.name}</h2>
          <p>{company.description}</p>
        </div>
      </div>
      
      <h3>Available Models</h3>
      
      <div className="models-container">
        {company.models.length > 0 ? (
          <div className="model-categories">
            {/* Group models by category (chat, image, etc.) */}
            {Object.entries(
              company.models.reduce((acc, model) => {
                if (!acc[model.category]) {
                  acc[model.category] = [];
                }
                acc[model.category].push(model);
                return acc;
              }, {})
            ).map(([category, models]) => (
              <div key={category} className="model-category">
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)} Models</h4>
                <ModelList 
                  items={models} 
                  onItemSelect={handleModelSelect} 
                  type="model"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">No models available for this company.</p>
        )}
      </div>
    </div>
  );
}

export default CompanyPage;