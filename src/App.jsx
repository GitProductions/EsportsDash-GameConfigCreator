import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import { AnimatePresence } from 'framer-motion';

import Header from './Header';
import Footer from './Footer';
import PageWrapper from './components/PageWrapper';
import Downloads from './pages/downloads/downloads';
import GameConfigExplorer from './pages/configDownloader';
import ConfigBuilder from './pages/configCreator';
import Home from './pages/home/home';

import './App.css';
import './index.css';


const RoutesWrapper = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/config-builder" element={<PageWrapper><ConfigBuilder /></PageWrapper>} />
        <Route path="/config-explorer" element={<PageWrapper><GameConfigExplorer /></PageWrapper>} />
        <Route path="/download" element={<PageWrapper><Downloads /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <NavigationProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="renderComp flex-grow-1">
            <RoutesWrapper />
          </main>
          <Footer />
        </div>
      </Router>
    </NavigationProvider>
  );
}

export default App;