import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileCode, faHome, faDownload, faGamepad, faCode } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { ThemeContext } from '../../context/ThemeContext';

import { downloadFolder, fetchFiles, fetchFolders, githubImages } from './configDownloader';

const AssetExplorer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [view, setView] = useState("menu");
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (folderName) => {
    setSelectedCard(folderName);
    setError(null);
    fetchFiles(`Game%20Configs/${folderName}`)
      .then(bggFiles => setFiles(bggFiles))
      .catch(err => setError(err.message));
  };



  
  const renderMenu = () => (
    <Container className={`py-4 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Card className={`shadow ${isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
        <Card.Header className={`${isDarkMode ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
          <h4 className="mb-0">
            <FontAwesomeIcon icon={faFolder} className="me-2" />
            Dashboard Asset Explorer
          </h4>
        </Card.Header>

        <Card.Body className={`px-4 pt-3 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
          <p className="lead mb-4">Select a category to explore:</p>
          <Row className="justify-content-center g-4">
            <Col xs={12} md={6}>

              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className={`d-flex flex-column ${isDarkMode ? 'bg-white text-dark' : 'bg-dark text-light'}`}>
                  <h3 className="h4 mb-3">
                    <FontAwesomeIcon icon={faGamepad} className="me-2" />
                    Game Configs
                  </h3>

                  <p className="mb-4">
                    Download Game Configuration files for use inside of the Dashboard
                  </p>
                  <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => { setView("gameConfigs"); fetchFolders("Game%20Configs"); }}
                  >
                    Explore Configs
                  </Button>
                </Card.Body>
              </Card>

            </Col>

            <Col xs={12} md={6}>

              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className={`d-flex flex-column ${isDarkMode ? 'bg-white text-dark' : 'bg-dark text-light'}`}>
                  <h3 className="h4 mb-3">
                    <FontAwesomeIcon icon={faCode} className="me-2" />
                    HTML Packs
                  </h3>
                  <p className="mb-4">
                    Download HTML packs for use inside of OBS, Streamlabs, etc.
                  </p>
                  <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => { setView("htmlPacks"); fetchFolders("HTML%20Packs"); }}
                  >
                    Explore Packs
                  </Button>
                </Card.Body>
              </Card>

            </Col>

          </Row>
        </Card.Body>
      </Card>
    </Container>
  );





  const renderGameConfigs = () => (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h1 className="mb-0">
              <FontAwesomeIcon icon={faGamepad} className="me-2" />
              Game Configs
            </h1>
            <Button variant="outline-primary" onClick={() => setView("menu")}>
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Back to Menu
            </Button>
          </div>

          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          <Row className="g-4">
            {folders.map((folder) => (
              <Col key={folder.name} xs={6} md={3}>
                <Card className="h-100 shadow-sm hover-card">
                  <Card.Body
                    className={`d-flex flex-column align-items-center justify-content-center h-100 ${selectedCard === folder.name ? 'border border-primary' : ''} `}
                    onClick={() => handleCardClick(folder.name)}
                  >

                    <LazyLoadImage
                      effect="blur"
                      src={`${githubImages}/${folder.name}/${folder.name}.png`}
                      alt={folder.name}
                      className="mb-3 rounded"
                      style={{ width: "150px", height: "150px" }}
                      wrapperProps={{
                        style: {transitionDelay: "0.3s"},
                    }}
                      visibleByDefault={true}
                    />

                  </Card.Body>
                  <Card.Footer className={`text-center ${selectedCard === folder.name ? 'bg-primary text-white' : ''}`}>
                    <h5 className="text-center">
                      <FontAwesomeIcon icon={faFileCode} className="me-2" />
                      {folder.name}
                    </h5>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          {files.length > 0 && (
            <div className="mt-5">
              <h2 className="mb-4">
                <FontAwesomeIcon icon={faFileCode} className="me-2" />
                .bgg Files
              </h2>
              <Row className="g-4">
                {files.map((file) => (
                  <Col key={file.name} xs={12} md={6} lg={4}>
                    <Card className="h-100 shadow-sm hover-card">
                      <Card.Body className="d-flex flex-column">
                        <LazyLoadImage
                            // effect="blur"
                            src={`${githubImages}/${selectedCard}/${selectedCard}.png`}
                            alt={file.name}
                            className="rounded"
                            style={{
                              width: "200px",
                              height: "200px",
                              objectFit: "contain"
                            }}
                            wrapperClassName="d-flex justify-content-center"
                            wrapperProps={{
                              style: { transitionDelay: "0.3s"}
                            }}
                            visibleByDefault={true}
                          />
                          
                        <h3 className="h5 mt-3 mb-3">{file.name}</h3>
                        <Button
                          variant="primary"
                          href={file.download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto"
                        >
                          <FontAwesomeIcon icon={faDownload} className="me-2" />
                          Download
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );




  const renderHtmlPacks = () => (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">
              <FontAwesomeIcon icon={faCode} className="me-2" />
              HTML Packs
            </h1>
            <Button variant="outline-primary" onClick={() => setView("menu")}>
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Back to Menu
            </Button>
          </div>

          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          <Row className="g-4">
            {folders.map((folder) => (
              <Col key={folder.name} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm hover-card">
                  <Card.Body className="d-flex flex-column">
                    <h3 className="h5 mb-3">{folder.name}</h3>
                    <Button
                      variant="primary"
                      onClick={() => downloadFolder(folder.url, folder.name)}
                      className="mt-auto"
                    >
                      <FontAwesomeIcon icon={faDownload} className="me-2" />
                      Download Folder
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );




  return (
    <div className="">
      {view === "menu" && renderMenu()}
      {view === "gameConfigs" && renderGameConfigs()}
      {view === "htmlPacks" && renderHtmlPacks()}
    </div>
  );
};

export default AssetExplorer;
