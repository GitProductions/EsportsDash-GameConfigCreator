import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import GameConfigExplorer from './components/configDownloader';
import ConfigBuilder from './components/configCreator';
import Home from './components/home/home';

import Header from './Header';
import Footer from './Footer';


function App() {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'configBuilder':
        return <ConfigBuilder />;
      case 'gameConfigExplorer':
        return <GameConfigExplorer />;
      default:
        return <Home onSelect={setSelectedComponent} />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onSelect={setSelectedComponent} selectedComponent={selectedComponent} />
      <main className="flex-grow-1">
        {renderComponent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;