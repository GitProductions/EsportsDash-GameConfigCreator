import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion'; 
import { faGamepad, faCode, faTrophy, faKeyboard, faBroadcastTower, faVideo, faFilm, faRedoAlt, faCloud } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../../context/ThemeContext';

const Features = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Container className={`py-5 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <h2 className="text-center mb-5">Why Choose Esports Dashboard?</h2>
      <Row>
        {featuresData.map((feature, index) => (
          <Feature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </Row>
    </Container>
  );
};

const featuresData = [
  {
    icon: faKeyboard,
    title: "Hotkeys Support",
    description: "Set up customizable hotkeys to streamline your gaming and broadcasting workflows."
  },
  {
    icon: faGamepad,
    title: "MIDI Controller Integration",
    description: "Control your configurations with ease using MIDI controllers for real-time adjustments."
  },
  {
    icon: faCode,
    title: "API Calls",
    description: "Integrate seamlessly with external tools and services through API support."
  },
  {
    icon: faBroadcastTower,
    title: "OBS Integration",
    description: "Connect directly with OBS Studio to manage configs, and update sources inside of OBS"
  },
  {
    icon: faVideo,
    title: "vMix Capable",
    description: "Easily integrate with vMix using data sources and GT Titles."
  },
  {
    icon: faFilm,
    title: "Video Editor",
    description: "Edit your replays and highlights directly within the app using the built-in video editor."
  },
  {
    icon: faRedoAlt,
    title: "Automatic Replay",
    description: "Automatically capture and replay crucial moments without interrupting your flow."
  },
  {
    icon: faGamepad,
    title: "Multiple Game Configurations",
    description: "Create, save, and switch between configurations for different games with ease."
  },
  {
    icon: faCloud,
    title: "Cloud Storage",
    description: "Securely store and sync your configurations, images and videos in the cloud for easy access anywhere."
  },
  {
    icon: faTrophy,
    title: "Tournament Ready",
    description: "Export and import configurations designed specifically for competitive tournament play."
  }
];

const Feature = ({ icon, title, description, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px"
  });

  return (
    <Col xs={12} md={6} lg={3} className="mb-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="h-100"
      >
        <Card className="h-100 shadow-sm hover-card border-0">
          <Card.Body className="text-center p-4">
            <div className="feature-icon mb-3">
              <FontAwesomeIcon icon={icon} size="2x" className="text-primary" />
            </div>
            <h3 className="h5 mb-3">{title}</h3>
            <p className="text-muted mb-0">{description}</p>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
};

export default Features;