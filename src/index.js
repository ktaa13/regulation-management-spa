import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import './index.css';
import App from './App';
import DetailsPage from './components/DetailsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root element

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/details/:id" element={<DetailsPage />} />
    </Routes>
  </Router>
);
