import React, { useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import CSVReader from "./csvreader";

const CSVSorter = () => {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [filterYear, setFilterYear] = useState("");
    const [columnSettings, setColumnSettings] = useState({});

    // Handle sorting
    const handleSort = (key) => {
        const sortedData = [...data].sort((a, b) => {
            if (key === "DATE") {
                return new Date(a[key]) - new Date(b[key]);
            }
            return a[key] > b[key] ? 1 : -1;
        });
        setData(sortedData);
        setSortBy(key);
    };

    // Filter data by year
    const filteredData =
        filterYear.length > 0
            ? data.filter((row) => row.DATE.includes(filterYear))
            : data;

    // Handle column settings change
    const handleColumnSettingChange = (header, setting) => {
        setColumnSettings({
            ...columnSettings,
            [header]: setting,
        });
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h2>CSV Sorter</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CSVReader onUpload={setData} onHeaders={setHeaders} />
                </Col>
            </Row>
            <Row className="my-4">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Filter by year (e.g., 2022)"
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                    />
                </Col>
                <Col>
                    <Button variant="secondary" onClick={() => setFilterYear("")}>
                        Reset Filters
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th key={header} onClick={() => handleSort(header)}>
                                        {header}{" "}
                                        {sortBy === header && (
                                            <FontAwesomeIcon icon={faSort} />
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index}>
                                    {headers.map((header) => (
                                        <td key={header}>
                                            {columnSettings[header] === "link" ? (
                                                <a href={row[header]} target="_blank" rel="noopener noreferrer">
                                                    {row[header]}
                                                </a>
                                            ) : columnSettings[header] === "image" ? (
                                                <img src={row[header]} alt={header} style={{ width: "100px" }} />
                                            ) : columnSettings[header] === "checkbox" ? (
                                                <Form.Check type="checkbox" checked={row[header] === "TRUE"} readOnly />
                                            ) : (
                                                row[header]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <p>
                        Total Rows: <strong>{filteredData.length}</strong>
                    </p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Column Settings</h3>
                    {headers.map((header) => (
                        <Form.Group key={header} controlId={`columnSetting-${header}`}>
                            <Form.Label>{header}</Form.Label>
                            <Form.Control
                                as="select"
                                value={columnSettings[header] || "text"}
                                onChange={(e) => handleColumnSettingChange(header, e.target.value)}
                            >
                                <option value="text">Text</option>
                                <option value="link">Link</option>
                                <option value="image">Image</option>
                                <option value="date">Date</option>
                                <option value="checkbox">Checkbox</option>
                            </Form.Control>
                        </Form.Group>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default CSVSorter;