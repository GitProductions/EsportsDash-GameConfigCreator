

import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileCode, faHome, faDownload, faGamepad, faCode, faTools } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { ThemeContext } from '../../context/ThemeContext';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { useNavbar } from '../../context/NavigationContext';
import { useNavigate } from 'react-router-dom';

const AssetExplorer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [view, setView] = useState("menu");
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);

  const navigate = useNavigate();



  const githubRepoPath = "https://api.github.com/repos/GitProductions/EsportsDashBoard/contents";
  const githubImages = "https://raw.githubusercontent.com/GitProductions/EsportsDashBoard/main/Game%20Configs"



  const downloadFolder = async (folderUrl, folderName) => {
    try {
      const response = await fetch(folderUrl);
      const files = await response.json();
      const zip = new JSZip();

      for (const file of files) {
        const fileResponse = await fetch(file.download_url);
        const fileData = await fileResponse.blob();
        zip.file(file.name, fileData);
      }

      const zipContent = await zip.generateAsync({ type: 'blob' });
      saveAs(zipContent, `${folderName}.zip`);
    } catch (error) {
      console.error('Error downloading folder:', error);
    }
  };


  const handleCardClick = (folderName) => {
    setSelectedCard(folderName);
    fetchFiles(`Game%20Configs/${folderName}`);
  };

  const fetchFiles = async (folderPath) => {
    //setLoading(true);
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
      //setLoading(false);
    }
  };

  const fetchFolders = async (repoPath) => {
    //setLoading(true);
    setError(null);
    try {
      const url = `${githubRepoPath}/${repoPath}`;
      const response = await fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } });
      if (!response.ok) throw new Error("Failed to fetch repository data.");
      const data = await response.json();
      const dirs = data.filter((item) => item.type === "dir");

      // lets make sure that deadlock and splatoon are at the bottom as they are 'coming soon' and not as popular either..
      dirs.sort((a, b) => {
        if (a.name === "Deadlock" || a.name === "Splatoon") return 1;
        if (b.name === "Deadlock" || b.name === "Splatoon") return -1;
        return 0;
      });

      setFolders(dirs);
    } catch (err) {
      setError(err.message);
    } finally {
      //setLoading(false);
    }
  };

  const renderMenu = () => (
    // <Container className={`py-5 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
    <Container className="py-5">

      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">
          <FontAwesomeIcon icon={faFolder} className="me-3" />
          Asset Explorer
        </h1>
        {/* <p className="lead text-muted"> */}
        <p className={`lead ${isDarkMode ? 'text-light' : 'text-muted'}`}>
          Explore and download Game Configurations and HTML Packs
        </p>
      </div>
      <Row className="justify-content-center g-4 bg-white pb-4 rounded">        
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


            <Col xs={12} md={6}>
              <Card className="h-100 shadow-sm hover-card">
                {/* <Card.Body className="d-flex flex-column"> */}
                <Card.Body className={`d-flex flex-column ${isDarkMode ? 'bg-white text-dark' : 'bg-dark text-light'}`}>
                  <h3 className="h4 mb-3">
                    <FontAwesomeIcon icon={faTools} className="me-2" />
                    Game Config Creator
                  </h3>
                  <p className="mb-4">
                    Create or edit a game config to use or share with others.
                  </p>
                  <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => navigate('/config-builder')}
                  >
                    Explore Packs
                  </Button>
                </Card.Body>
              </Card>
              
            </Col>

          

          </Row>


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
                        style: { transitionDelay: "0.3s" },
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
                            style: { transitionDelay: "0.3s" }
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
                    {/* <img src="/api/placeholder/300/200" alt={folder.name} className="mb-3 rounded" /> */}
                    <h3 className="h5 mb-3">{folder.name}</h3>
                    {/* <Button
                      variant="primary"
                      href={`https://downgit.github.io/#/home?url=${folder.html_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto"
                    > */}
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