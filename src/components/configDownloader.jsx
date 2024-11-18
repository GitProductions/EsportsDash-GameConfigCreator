

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileCode, faHome, faDownload, faGamepad, faCode } from '@fortawesome/free-solid-svg-icons';

const GameConfigExplorer = () => {
  const [view, setView] = useState("menu");
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);

  const isDarkMode = false;

  const githubRepoPath = "https://api.github.com/repos/GitProductions/EsportsDashBoard/contents";
  const githubImages = "https://raw.githubusercontent.com/GitProductions/EsportsDashBoard/main/Game%20Configs"

  const handleCardClick = (folderName) => {
    setSelectedCard(folderName);
    fetchFiles(`Game%20Configs/${folderName}`);
  };

  const fetchFiles = async (folderPath) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${githubRepoPath}/${folderPath}`;
      const response = await fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } });
      if (!response.ok) throw new Error("Failed to fetch files.");
      const data = await response.json();
      const bggFiles = data.filter((file) => file.name.endsWith(".bgg"));
      setFiles(bggFiles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFolders = async (repoPath) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${githubRepoPath}/${repoPath}`;
      const response = await fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } });
      if (!response.ok) throw new Error("Failed to fetch repository data.");
      const data = await response.json();
      const dirs = data.filter((item) => item.type === "dir");
      setFolders(dirs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderMenu = () => (
    <Container className={`py-4 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Card className={`shadow ${isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
        <Card.Header className={`${isDarkMode ? 'bg-dark text-white' : 'bg-primary text-white'}`}>
          <h4 className="mb-0">
            <FontAwesomeIcon icon={faFolder} className="me-2" />
            Dashboard Asset Downloads
          </h4>

        </Card.Header>
        <Card.Body className="px-4 pt-3">
          <p className="lead mb-4">Select a category to explore:</p>
          <Row className="justify-content-center g-4">
            <Col xs={12} md={6}>
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="d-flex flex-column">
                  <h3 className="h4 mb-3">
                    <FontAwesomeIcon icon={faGamepad} className="me-2" />
                    Game Configs
                  </h3>
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
                <Card.Body className="d-flex flex-column">
                  <h3 className="h4 mb-3">
                    <FontAwesomeIcon icon={faCode} className="me-2" />
                    HTML Packs
                  </h3>
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
              <Col key={folder.name} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm hover-card">
                  <Card.Body
                    className={`h-100 shadow-sm hover-card ${selectedCard === folder.name ? 'bg-primary text-white' : ''}`}
                    onClick={() => handleCardClick(folder.name)}
                  >
                    <Image src={`${githubImages}/${folder.name}/${folder.name}.png`} alt={folder.name}
                     className="mb-3 rounded"
                     style={{ width: "150px", height: "150px" }}
                      />

                    <h3 className="h5 mb-3">
                      <FontAwesomeIcon icon={faFileCode} className="me-2" />
                      {folder.name}
                    </h3>
                
                  </Card.Body>
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
                        {/* <Image src={`${githubImages}/${selectedCard}/${selectedCard}.png`} alt={file.name} className="mb-3 rounded" /> */}
                        <h3 className="h5 mb-3">{file.name}</h3>
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
                    {/* <img src="/api/placeholder/300/200" alt={folder.name} className="mb-3 rounded" /> */}
                    <h3 className="h5 mb-3">{folder.name}</h3>
                    <Button
                      variant="primary"
                      href={`https://downgit.github.io/#/home?url=${folder.html_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
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
    <div className="bg-light min-vh-100">
      {view === "menu" && renderMenu()}
      {view === "gameConfigs" && renderGameConfigs()}
      {view === "htmlPacks" && renderHtmlPacks()}
    </div>
  );
};

export default GameConfigExplorer;
