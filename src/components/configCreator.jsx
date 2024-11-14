import React, { useState } from 'react';
import { Card, Tabs, Tab, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faDownload,
  faTimes,
  faGamepad,
  faCode,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


const ConfigBuilder = () => {
  const [activeTab, setActiveTab] = useState('maps');
  const [selectedSections, setSelectedSections] = useState({
    maps: true,
    modes: true,
    roles: true,
    heroes: true
  });
  const [images, setImages] = useState({
    maps: [],
    modes: [],
    roles: [],
    heroes: []
  });
  const [configMeta, setConfigMeta] = useState({
    game: 'Overwatch',
    version: '1.0',
    author: ''
  });

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const newImages = imageFiles.map(file => ({
      file,
      name: formatFileName(file.name),
      id: Math.random().toString(36).substr(2, 9),
      role: activeTab === 'heroes' ? 'Select a role' : '' // Initialize role for heroes
    }));

    setImages(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], ...newImages]
    }));
  };

  const formatFileName = (fileName) => {
    return fileName
      .replace(/\.[^/.]+$/, '')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ');
  };

  const handleNameChange = (id, newName) => {
    setImages(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(img =>
        img.id === id ? { ...img, name: newName } : img
      )
    }));
  };

  const handleRoleChange = (id, newRole) => {
    setImages(prev => ({
      ...prev,
      heroes: prev.heroes.map(img =>
        img.id === id ? { ...img, role: newRole } : img
      )
    }));
  };

  const removeImage = (id) => {
    setImages(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(img => img.id !== id)
    }));
  };

  const generateXML = () => {
    const xmlParts = [];

    xmlParts.push(`<config>\n  <game>${configMeta.game}</game>\n  <version>${configMeta.version}</version>\n  <author>${configMeta.author}</author>`);

    Object.entries(selectedSections).forEach(([section, isSelected]) => {
      if (isSelected && images[section].length > 0) {
        const sectionItems = images[section].map(item => {
          const fileName = item.file.name.replace(/\.[^/.]+$/, '').replace(/ /g, '_');
          if (section === 'heroes') {
            const role = item.role === 'Select a role' ? '' : item.role;
            return `    <hero name="${item.name}" file="${fileName}" role="${role}" />`;
          }
          return `    <${section.slice(0, -1)} name="${item.name}" file="${fileName}" />`;
        }).join('\n');

        xmlParts.push(`\n  <${section}>\n${sectionItems}\n  </${section}>`);
      }
    });

    xmlParts.push('</config>');
    return xmlParts.join('\n');
  };

  const downloadConfig = () => {
    const xml = generateXML();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${configMeta.game}-config.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const zipConfignFiles = () => {
    const zip = new JSZip();
    const imagesFolder = zip.folder('images');

    const xml = generateXML();
    zip.file(`${configMeta.game}.xaml`, xml);

    Object.entries(selectedSections).forEach(([section, isSelected]) => {
      if (isSelected && images[section] && images[section].length > 0) {
        const sectionFolder = imagesFolder.folder(section);
        images[section].forEach(item => {
          const fileName = item.file.name.replace(/\.[^/.]+$/, '').replace(/ /g, '_');
          sectionFolder.file(`${fileName}.png`, item.file);
        });
      }
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `${configMeta.game}-config.zip`);
    });
  };


  return (
    <Container className="py-4">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Esports DashBoard Config Builder</h4>
        </Card.Header>
        <Card.Body>
          {/* Metadata Section */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Author
                </Form.Label>
                <Form.Control
                  type="text"
                  value={configMeta.author}
                  onChange={(e) => setConfigMeta(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Enter author name"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faCode} className="me-2" />
                  Version
                </Form.Label>
                <Form.Control
                  type="text"
                  value={configMeta.version}
                  onChange={(e) => setConfigMeta(prev => ({ ...prev, version: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faGamepad} className="me-2" />
                  Game
                </Form.Label>
                <Form.Control
                  type="text"
                  value={configMeta.game}
                  onChange={(e) => setConfigMeta(prev => ({ ...prev, game: e.target.value }))}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Main Tabs */}
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            {['maps', 'modes', 'roles', 'heroes'].map(section => (
              <Tab key={section} eventKey={section} title={section.charAt(0).toUpperCase() + section.slice(1)}>
                <div className="mt-3">
                  <div
                    className="border border-2 border-dashed rounded p-5 text-center mb-4 cursor-pointer"
                    style={{ background: '#f8f9fa' }}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById(`${section}-upload`).click()}
                  >
                    <FontAwesomeIcon icon={faUpload} size="2x" className="text-secondary mb-3" />
                    <p className="mb-0">Drag & drop images here or click to upload</p>
                    <input
                      id={`${section}-upload`}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="d-none"
                    />
                  </div>

                  <Row xs={1} md={2} lg={3} className="g-4">
                    {images[section].map(image => (
                      <Col key={image.id}>
                        <div className="position-relative">
                          <img
                            src={URL.createObjectURL(image.file)}
                            alt={image.name}
                            className="img-fluid rounded mb-2"
                            style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                          />
                          <Button
                            variant="danger"
                            size="sm"
                            className="position-absolute top-0 end-0 m-2"
                            onClick={() => removeImage(image.id)}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </Button>
                          <Form.Control
                            type="text"
                            value={image.name}
                            onChange={(e) => handleNameChange(image.id, e.target.value)}
                          />
                          {section === 'heroes' && (
                            <Form.Control
                              as="select"
                              value={image.role}
                              onChange={(e) => handleRoleChange(image.id, e.target.value)}
                            >
                              <option value="">Select a role</option>
                              {images.roles.map((role, index) => (
                                <option key={index} value={role.name}>
                                  {role.name}
                                </option>
                              ))}
                            </Form.Control>
                          )}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Tab>
            ))}
          </Tabs>

          {/* Export Options */}
          <div className="border-top pt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Export Sections</h5>
            
            </div>
            <Row xs={2} md={6} className="g-3">
              {Object.entries(selectedSections).map(([section, isSelected]) => (
                <Col key={section}>
                  <Form.Check
                    style={{ width: '100px' }}
                    type="switch"
                    id={`${section}-toggle`}
                    label={section.charAt(0).toUpperCase() + section.slice(1)}
                    checked={isSelected}
                    onChange={(e) => setSelectedSections(prev => ({
                      ...prev,
                      [section]: e.target.checked
                    }))}
                  />
                </Col>
              ))}
            </Row>

            <div className="d-flex align-items-center mt-5">
                <Button variant="success" onClick={downloadConfig} className="me-2">
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  Export XML
                </Button>
                <Button variant="primary" onClick={zipConfignFiles}>
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  Export Zip
                </Button>
              </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ConfigBuilder;