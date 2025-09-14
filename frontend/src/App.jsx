// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import ModelPage from './pages/ModelPage';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>AI API Test Hub</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/company/:companyId" element={<CompanyPage />} />
            <Route path="/model/:modelId" element={<ModelPage />} />
          </Routes>
        </main>
        <footer>
          <p>© 2025 AI API Test Hub</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;