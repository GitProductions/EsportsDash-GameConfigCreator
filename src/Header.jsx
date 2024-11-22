import React, { useContext } from 'react';
import { Navbar, Nav, Container, Row, Col, Button, } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from './context/ThemeContext';


function Header({ onSelect, selectedComponent }) {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
//t
  return (

    // <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
    <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faGamepad} className="me-2 " />
          Esports Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              active={selectedComponent === 'home'}
              onClick={() => onSelect('home')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              active={selectedComponent === 'config-builder'}
              onClick={() => onSelect('config-builder')}
            >
              Config Builder
            </Nav.Link>
            <Nav.Link
              active={selectedComponent === 'config-explorer'}
              onClick={() => onSelect('config-explorer')}
            >
              Asset Explorer
            </Nav.Link>
            <Nav.Link
              active={selectedComponent === 'download'}
              onClick={() => onSelect('download')}
            >
              Download
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

        <Button variant={isDarkMode ? 'dark' : 'light'} onClick={toggleDarkMode}>
          {/* {isDarkMode ? 'Light Mode' : 'Dark Mode'} */}
          <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
        </Button>
      </Container>
    </Navbar>

  )
}

export default Header