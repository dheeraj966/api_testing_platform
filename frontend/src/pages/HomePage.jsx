// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ModelList from '../components/ModelList';
import { fetchAllCompanies } from '../utils/api';

function HomePage() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchAllCompanies();
        setCompanies(data);
        setFilteredCompanies(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load companies:", error);
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredCompanies(companies);
      return;
    }

    const filtered = companies.filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.models.some(model => 
        model.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredCompanies(filtered);
  };

  const handleCompanySelect = (companyId) => {
    navigate(`/company/${companyId}`);
  };

  if (loading) {
    return <div className="loading">Loading AI models...</div>;
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h2>Test Any AI API With Ease</h2>
        <p>Verify connectivity and test responses from all major AI providers in one place</p>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      <div className="company-grid">
        {filteredCompanies.length > 0 ? (
          <ModelList 
            items={filteredCompanies} 
            onItemSelect={handleCompanySelect} 
            type="company"
          />
        ) : (
          <p className="no-results">No AI models found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;