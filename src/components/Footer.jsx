import React, { useContext } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { ThemeContext } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Documentation', href: 'https://github.com/GitProductions/EsportsDashBoard' },
      { name: 'Support', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
    socialLinks: [
      { name: 'Discord', href: 'https://discord.com', icon: faDiscord },
      { name: 'Twitter', href: 'https://twitter.com/gitago_', icon: faTwitter },
      { name: 'GitHub', href: 'https://github.com/GitProductions/EsportsDashBoard', icon: faGithub },
    ],
  };

  return (
    <footer className={`py-4 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Container>
        <Row className="text-center">
          {/* Quick Links Section */}
          {/* <Col xs={12} className="mb-4">
            <h5 className="text-uppercase fw-bold mb-3">Quick Links</h5>
            <Nav className="d-flex flex-column align-items-center">
              {footerLinks.quickLinks.map((link) => (
                <Nav.Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-0 py-1 ${isDarkMode ? 'text-white-50' : 'text-dark'}`}
                >
                  {link.name}
                </Nav.Link>
              ))}
            </Nav>
          </Col> */}
          

          {/* Connect Section */}
          <Col xs={12} className="mb-2">
            <h5 className="text-uppercase fw-bold mb-3">Connect With Us</h5>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {footerLinks.socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant={isDarkMode ? 'outline-light' : 'outline-dark'}
                  size="sm"
                  onClick={() => window.open(link.href, '_blank')}
                  className="min-width-100"
                  style={{ minWidth: '100px' }}
                >
                  <FontAwesomeIcon icon={link.icon} className="me-2" />
                  {link.name}
                </Button>
              ))}
            </div>
          </Col>

        </Row>

        {/* Divider */}
        <hr className={`my-4 ${isDarkMode ? 'border-secondary' : 'border-dark'}`} />

        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <small className={isDarkMode ? 'text-white-50' : 'text-dark-50'}>
              © {currentYear} Esports Dashboard. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
