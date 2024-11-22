import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import GameConfigExplorer from './pages/configDownloader';
import ConfigBuilder from './pages/configCreator';
import Home from './pages/home/home';
import Header from './Header';
import Footer from './Footer';
import Downloads from './components/downloads/downloads';
import './App.css';
import './index.css';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('home');

  return (
    <BrowserRouter>
      <AppContent 
        selectedComponent={selectedComponent} 
        setSelectedComponent={setSelectedComponent} 
      />
    </BrowserRouter>
  );
}

function AppContent({ selectedComponent, setSelectedComponent }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Sync route with selected component
  useEffect(() => {
    switch (selectedComponent) {
      case 'configBuilder':
        navigate('/configBuilder');
        break;
      case 'gameConfigExplorer':
        navigate('/gameConfigExplorer');
        break;
      case 'download':
        navigate('/download');
        break;
      default:
        navigate('/');
    }
  }, [selectedComponent, navigate]);

  // Sync selected component with route
  useEffect(() => {
    switch (location.pathname) {
      case '/configBuilder':
        setSelectedComponent('configBuilder');
        break;
      case '/gameConfigExplorer':
        setSelectedComponent('gameConfigExplorer');
        break;
      case '/download':
        setSelectedComponent('download');
        break;
      default:
        setSelectedComponent('home');
    }
  }, [location.pathname, setSelectedComponent]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        onSelect={setSelectedComponent}
        selectedComponent={selectedComponent}
      />
      <main className="renderComp flex-grow-1 fade-in">
        <Routes>
          <Route 
            path="/" 
            element={<Home onSelect={setSelectedComponent} />} 
          />
          <Route 
            path="/configBuilder" 
            element={<ConfigBuilder />} 
          />
          <Route 
            path="/gameConfigExplorer" 
            element={<GameConfigExplorer />} 
          />
          <Route 
            path="/download" 
            element={<Downloads />} 
          />
          {/* Redirect any unknown routes to home */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;