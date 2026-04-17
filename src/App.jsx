import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './assets/Components/HeroSection/HeroSection';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Initialize theme from localStorage or default to dark
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('elguapo_theme') !== 'light';
  });

  useEffect(() => {
    const token = localStorage.getItem('elguapo_token');
    if (token) setIsAuthenticated(true);
  }, []);

  // Theme Toggler Logic
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('elguapo_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('elguapo_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <Routes>
        {/* Pass theme and toggle function to Home */}
        <Route path="/" element={<Home isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        
        <Route 
          path="/login" 
          element={<Login setIsAuthenticated={setIsAuthenticated} isDarkMode={isDarkMode} />} 
        />

        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <Dashboard setIsAuthenticated={setIsAuthenticated} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;