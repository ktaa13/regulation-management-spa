import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import DetailsPage from './components/DetailsPage';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import MainTable from './components/MainTable.js';

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
              <li className="nav-item">
                <button className="btn btn-danger" onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}>تسجيل الخروج</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><MainTable /></PrivateRoute>} />
          <Route path="/details/:id" element={<PrivateRoute><DetailsPage /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  </Router>
);
