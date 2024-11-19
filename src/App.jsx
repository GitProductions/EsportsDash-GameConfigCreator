import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import './index.css'

import GameConfigExplorer from './components/configDownloader';
import ConfigBuilder from './components/configCreator';
import Home from './components/home/home';

import Header from './Header';
import Footer from './Footer';
import Downloads from './components/downloads/downloads';

import { ThemeProvider } from './context/ThemeContext';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'configBuilder':
        // fadeInComponent();
        return <ConfigBuilder />;
      case 'gameConfigExplorer':
        // fadeInComponent();
        return <GameConfigExplorer />;

      case 'download':
        // fadeInComponent();
        return <Downloads />;
      default:
        // fadeInComponent();
        return <Home onSelect={setSelectedComponent} />;
    }
    
  };

  return (
    <ThemeProvider>
      {/* <Router> */}
        <div className="d-flex flex-column min-vh-100">
          <Header onSelect={setSelectedComponent} selectedComponent={selectedComponent} />
          <main className="renderComp flex-grow-1 fade-in">
            {renderComponent()}
          </main>
          <Footer />
        </div>
      {/* </Router> */}
    </ThemeProvider>
  );
}

export default App;