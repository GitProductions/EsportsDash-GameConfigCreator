import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';

import Header from './Header';
import Footer from './Footer';
import Downloads from './pages/downloads/downloads';
import GameConfigExplorer from './pages/configDownloader';
import ConfigBuilder from './pages/configCreator';
import Home from './pages/home/home';

import './App.css';
import './index.css';

function App() {
  return (
    <NavigationProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="renderComp flex-grow-1 fade-in">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/config-builder" element={<ConfigBuilder />} />
              <Route path="/config-explorer" element={<GameConfigExplorer />} />
              <Route path="/download" element={<Downloads />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NavigationProvider>
  );
}

export default App;