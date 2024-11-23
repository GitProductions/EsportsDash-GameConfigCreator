import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col, Button, } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { useNavbar } from '../context/NavigationContext';

function Header() {
  const { selectedPage, setSelectedPage } = useNavbar();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    setSelectedPage(path);
  }, [location, setSelectedPage]);

  const handleBrandClick = () => {
    setSelectedPage('home');
  };

  return (
    <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} expand="lg" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" onClick={handleBrandClick}>
          <FontAwesomeIcon icon={faGamepad} className="me-2 " />
          Esports Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              active={selectedPage === 'home'}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/config-builder"
              active={selectedPage === 'config-builder'}
            >
              Config Builder
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/config-explorer"
              active={selectedPage === 'config-explorer'}
            >
              Asset Explorer
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/download"
              active={selectedPage === 'download'}
            >
              Download
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button variant={isDarkMode ? 'dark' : 'light'} onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;