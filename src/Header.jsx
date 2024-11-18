import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad} from '@fortawesome/free-solid-svg-icons';

const Header = ({ onSelect, selectedComponent }) => (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
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
              active={selectedComponent === 'configBuilder'}
              onClick={() => onSelect('configBuilder')}
            >
              Config Builder
            </Nav.Link>
            <Nav.Link
              active={selectedComponent === 'gameConfigExplorer'}
              onClick={() => onSelect('gameConfigExplorer')}
            >
              Config Explorer
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

export default Header;