import React from 'react';
import { Nav, Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-white py-5">
    <Container>
      <Row className="align-items-center">

          {/* Quick Links Section */}
          <Col md={4} className="mb-4 mb-md-0">
          <h5 className="text-uppercase fw-bold">Quick Links</h5>
          <Nav className="flex-column align-items-center align-items-md-start">
            <Nav.Link
              target="_blank"
              href="https://github.com/GitProductions/EsportsDashBoard"
              className="text-white-50 p-0 mb-2"
            >
              Documentation
            </Nav.Link>
            <Nav.Link href="#" className="text-white-50 p-0 mb-2">
              Support
            </Nav.Link>
            <Nav.Link href="#" className="text-white-50 p-0 mb-2">
              Terms of Service
            </Nav.Link>
            <Nav.Link href="#" className="text-white-50 p-0">
              Privacy Policy
            </Nav.Link>
          </Nav>
        </Col>
        

         {/* Connect Section */}
         <Col md={4} className="text-center ">
          <h5 className="text-uppercase fw-bold">Connect With Us</h5>
          <div className="d-flex justify-content-center  gap-2 mt-3">
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => window.open("https://discord.com", "_blank")}
            >
              Discord
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => window.open("https://twitter.com/gitago_", "_blank")}
            >
              Twitter
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              onClick={() =>
                window.open("https://github.com/GitProductions/EsportsDashBoard", "_blank")
              }
            >
              GitHub
            </Button>
          </div>
        </Col>

        {/* About Us Section */}
        <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
          <h5 className="text-uppercase fw-bold">About Us</h5>
          <p className="text-white-50">
            Providing professional esports production solutions since 2023.
          </p>
        </Col>

      
       
      </Row>
      {/* Divider */}
      <hr className="my-4 text-white-50" />
      {/* Footer Bottom Text */}
      <div className="text-center text-white-50">
        © 2024 Esports Dashboard. All rights reserved.
      </div>
    </Container>
  </footer>
);

export default Footer;
