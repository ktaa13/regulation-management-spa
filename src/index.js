import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import DetailsPage from './components/DetailsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <div dir="rtl"> {/* Apply RTL direction globally */}
      {/* Bootstrap Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">إدارة اللوائح</Link> {/* Arabic text */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">الرئيسية</Link> {/* Arabic text */}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </div>
    </div>
  </Router>
);
