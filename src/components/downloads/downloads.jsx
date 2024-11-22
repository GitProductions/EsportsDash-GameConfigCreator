import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload, 
  faCalendarAlt, 
  faFileAlt, 
  faExternalLinkAlt, 
  faInfoCircle,
  faArchive
} from '@fortawesome/free-solid-svg-icons';

import { ThemeContext } from '../../context/ThemeContext';

const Downloads = () => {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/GitProductions/EsportsDashBoard/releases");
        if (!response.ok) throw new Error("Failed to fetch releases");
        const data = await response.json();

        console.log(data);
        setReleases(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading releases...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">
          <FontAwesomeIcon icon={faArchive} className="me-3" />
          Software Releases
        </h1>
        {/* <p className="lead text-muted"> */}
        <p className={`lead ${isDarkMode ? 'text-light' : 'text-muted'}`}>
          Download the latest versions and updates for Esports Dashboard
        </p>
      </div>

      {releases.length === 0 ? (
        <Alert variant="info">No releases available at this time.</Alert>
      ) : (
        releases.map((release) => (
          <Card key={release.id} className="mb-4 shadow-sm hover-card">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            {/* <Card.Header className={`bg-${isDarkMode ? 'dark' : 'primary'} text-white d-flex justify-content-between align-items-center`}> */}
              <h2 className="h5 mb-0">
                {release.name || release.tag_name}
                <Badge bg="light" text="dark" className="ms-2">
                  v{release.tag_name}
                </Badge>
                {release.prerelease && (
                  <Badge bg="warning" text="dark" className="ms-2">
                    Pre-release
                  </Badge>
                )}
              </h2>
              <Button
                variant="outline-light"
                size="sm"
                href={release.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                View on GitHub
              </Button>
            </Card.Header>
            
            {/* <Card.Body> */}
            <Card.Body >
              <div className="mb-3">
                <small className="text-muted">
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                  Released on {formatDate(release.published_at)}
                </small>
              </div>

              {release.body && (
                <div className="mb-4">
                  <h3 className="h6 mb-2">
                    <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                    Release Notes
                  </h3>
                  <Card.Text className="" style={{ whiteSpace: 'pre-line' }}>
                    {release.body}
                  </Card.Text>
                </div>
              )}

              {release.assets && release.assets.length > 0 && (
                <div>
                  <h3 className="h6 mb-3">
                    <FontAwesomeIcon icon={faDownload} className="me-2" />
                    Downloads
                  </h3>
                  <div className="d-flex flex-wrap gap-2">
                    {release.assets.map((asset) => (
                      <Button
                        key={asset.id}
                        variant="outline-primary"
                        size="sm"
                        href={asset.browser_download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center"
                      >
                        <FontAwesomeIcon icon={faDownload} className="me-2" />
                        <span className="me-2">{asset.name}</span>
                        <Badge bg="light" text="dark">
                          {formatFileSize(asset.size)}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Downloads;
