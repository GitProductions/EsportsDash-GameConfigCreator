import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDownload, } from '@fortawesome/free-solid-svg-icons';


const Hero = ({ onSelect }) => (

    <div className="bg-primary text-white py-5">
    <Container className="py-5">
        <Row className="align-items-center">
            <Col lg={6}>
                <h1 className="display-4 fw-bold mb-3">
                    Elevate Your Gaming Experience
                </h1>
                <p className="lead mb-4">
                    Create, manage, and share professional esports configurations with our comprehensive dashboard solution.
                </p>
                <div className="d-flex gap-3">
                    <Button
                        variant="light"
                        size="lg"
                        onClick={() => onSelect('configBuilder')}
                    >
                        <FontAwesomeIcon icon={faCog} className="me-2" />
                        Build Config
                    </Button>
                    <Button
                        variant="outline-light"
                        size="lg"
                        onClick={() => onSelect('gameConfigExplorer')}
                    >
                        <FontAwesomeIcon icon={faDownload} className="me-2" />
                        Explore Configs
                    </Button>
                </div>
            </Col>
            <Col lg={6} className="text-center">
                <img
                    src={`${import.meta.env.BASE_URL}/dashpreview.jpg`}

                    alt="Dashboard Preview"
                    className="img-fluid rounded shadow-lg"
                />
            </Col>
        </Row>
    </Container>
</div>
);

export default Hero;