import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDownload, } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';


const Hero = ({ onSelect }) => {
    const totalImages = 10;
    const fadeInterval = 3000;

    return (
        <div className="bg-primary text-white py-5">
            <Container className="py-5 px-sm-0 px-lg-5">
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

                    <Col className="text-center mt-5 mt-lg-0 ">
                        <Carousel className="carousel-fade" controls={false} indicators={false} interval={fadeInterval}>
                            {[...Array(totalImages)].map((_, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        src={`${import.meta.env.BASE_URL}/images/${index + 1}.png`}
                                        alt={`Slide ${index + 1}`}
                                        className="img-fluid rounded shadow-lg"
                                    />
                                </Carousel.Item>
                            ))}

                        </Carousel>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
}

export default Hero;