import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Card } from 'react-bootstrap';

import { faGamepad, faCode, faTrophy, faKeyboard, faBroadcastTower, faVideo, faFilm, faRedoAlt, faCloud } from '@fortawesome/free-solid-svg-icons';



  const Features = () => (
    <Container className="py-5">
    <h2 className="text-center mb-5">Why Choose Esports Dashboard?</h2>
    <Row>
        <Feature
            icon={faKeyboard}
            title="Hotkeys Support"
            description="Set up customizable hotkeys to streamline your gaming and broadcasting workflows."
        />
        <Feature
            icon={faGamepad}
            title="MIDI Controller Integration"
            description="Control your configurations with ease using MIDI controllers for real-time adjustments."
        />
        <Feature
            icon={faCode}
            title="API Calls"
            description="Integrate seamlessly with external tools and services through powerful API support."
        />
        <Feature
            icon={faBroadcastTower}
            title="OBS Integration"
            description="Connect directly with OBS Studio to manage configs, and update sources inside of OBS"
        />
        <Feature
            icon={faVideo}
            title="vMix Capable"
            description="Easily integrate with vMix using data sources and GT Titles."
        />
        <Feature
            icon={faFilm}
            title="Video Editor"
            description="Edit your replays and highlights directly within the app using the built-in video editor."
        />
        <Feature
            icon={faRedoAlt}
            title="Automatic Replay"
            description="Automatically capture and replay crucial moments without interrupting your flow."
        />
        <Feature
            icon={faGamepad}
            title="Multiple Game Configurations"
            description="Create, save, and switch between configurations for different games with ease."
        />
        <Feature
            icon={faCloud}
            title="Cloud Storage"
            description="Securely store and sync your configurations, images and videos in the cloud for easy access anywhere."
        />
        <Feature
            icon={faTrophy}
            title="Tournament Ready"
            description="Export and import configurations designed specifically for competitive tournament play."
        />

    </Row>
</Container>

    );

    const Feature = ({ icon, title, description }) => (
      <Col xs={12} md={6} lg={3} className="mb-4">
        <Card className="h-100 shadow-sm hover-card border-0">
          <Card.Body className="text-center p-4">
            <div className="feature-icon mb-3">
              <FontAwesomeIcon icon={icon} size="2x" className="text-primary" />
            </div>
            <h3 className="h5 mb-3">{title}</h3>
            <p className="text-muted mb-0">{description}</p>
          </Card.Body>
        </Card>
      </Col>
    );


export default Features;