import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeContext } from '../../../context/ThemeContext';


const AboutSection = ({ title, description, media }) => {
    return (
        <div className="feature-box p-4 shadow rounded bg-white">
            <h3 className="fw-bold text-primary">{title}</h3>
            {/* <img src={media} alt="Active Development" className="img-fluid" /> */}
            <p className="mt-3 text-muted">
                {description}
            </p>
        </div>
    )
}


function About() {
    const { isDarkMode } = useContext(ThemeContext);
    const lgColSize = 6
    const smColSize = 6
    return (
        <div className="about-section py-5 bg-light">
            <Container>
                <Row className="text-center">
                    <Col md={lgColSize} className="mb-5">
                        <AboutSection
                            title="🚀 Active Development"
                            description="Constant updates, bug fixes, and new features based on community feedback to ensure the best experience."
                            // media="https://www.pstcc.edu/media/pstccedu/site-assets/images/PSCC-LOGO-FC-WEB.png" 
                        />
                    </Col>
                    <Col md={lgColSize} className="mb-5">
                        <AboutSection
                            title="🎮 Freemium Model"
                            description="Start with powerful free features, and unlock premium tools when you're ready to elevate your experience."
                            // media="https://cdn.pix bay.com/photo/2016/11/29/05/45/active-1867181_960_720.jpg"
                        />
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col md={lgColSize} className="mb-5">
                        <AboutSection
                            title="💬 Discord Support"
                            description="Join our Discord for community-driven support, feature requests, and exclusive updates."
                        />
                    </Col>
                    <Col md={lgColSize} className="mb-5">
                        <AboutSection
                            title="🔗 Seamless Integrations"
                            description="Easily integrate with OBS, vMix, and other tools for streaming and production."
                        />
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default About
