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



function App() {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderComponent = () => {
    // lets add class to rendercomp main class?

    // const fadeInComponent = () => {
    //   const renderComp = document.querySelector('.renderComp');
    //   if (renderComp) {
    //       renderComp.classList.add('fade-in');
      
    //    setTimeout(() => {
    //     renderComp.classList.remove('fade-in');
    //   }, 1000);
    // }
    // }


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
    <div className="d-flex flex-column min-vh-100">
      <Header onSelect={setSelectedComponent} selectedComponent={selectedComponent} />
      <main className="renderComp flex-grow-1 fade-in">
        {renderComponent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;