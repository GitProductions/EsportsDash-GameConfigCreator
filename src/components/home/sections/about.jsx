import React, { useContext } from 'react';
import { Container, Row, Col} from 'react-bootstrap';

import { ThemeContext } from '../../../context/ThemeContext';

function About() {
    const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className="about-section py-5 bg-light">
     {/* <div className={`about-section py-5 ${isDarkMode ? 'bg-light text-white' : 'bg-light text-dark'}`}> */}
    <Container>
        <Row className="text-center">
            <Col md={6} className="mb-5">
                <div className="feature-box p-4 shadow rounded bg-white">
                    <h3 className="fw-bold text-primary">🚀 Active Development</h3>
                    <p className="mt-3 text-muted">
                        Constant updates, bug fixes, and new features based on community feedback to ensure the best experience.
                    </p>
                </div>
            </Col>
            <Col md={6} className="mb-5">
                <div className="feature-box p-4 shadow rounded bg-white">
                    <h3 className="fw-bold text-primary">🎮 Freemium Model</h3>
                    <p className="mt-3 text-muted">
                        Start with powerful free features, and unlock premium tools when you're ready to elevate your experience.
                    </p>
                </div>
            </Col>
        </Row>
        <Row className="text-center">
            <Col md={6} className="mb-5">
                <div className="feature-box p-4 shadow rounded bg-white">
                    <h3 className="fw-bold text-primary">💬 Discord Support</h3>
                    <p className="mt-3 text-muted">
                        Join our Discord for 24/7 community-driven support, feature requests, and exclusive content.
                    </p>
                </div>
            </Col>
            <Col md={6} className="mb-5">
                <div className="feature-box p-4 shadow rounded bg-white">
                    <h3 className="fw-bold text-primary">🔗 Seamless Integrations</h3>
                    <p className="mt-3 text-muted">
                        Easily integrate with OBS, vMix, and other industry tools for professional streaming and production.
                    </p>
                </div>
            </Col>
        </Row>
    </Container>

</div>
  )
}

export default About
