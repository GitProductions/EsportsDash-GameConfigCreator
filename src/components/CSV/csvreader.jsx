// import React, { useRef } from "react";
// import { Button } from "react-bootstrap";
// import { parse } from "csv-parse/browser/esm";

// const CSVReader = ({ onUpload }) => {
//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         const csvData = event.target.result;

//         parse(
//           csvData,
//           {
//             columns: true, // Use the first row as headers
//             skip_empty_lines: true, // Ignore empty lines
//             trim: true, // Trim whitespace from headers and fields
//           },
//           (err, records) => {
//             if (err) {
//               console.error("Error parsing CSV:", err);
//               return;
//             }
//             onUpload(records); // Pass parsed data to the parent
//           }
//         );
//       };

//       reader.readAsText(file);
//     }
//   };

//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept=".csv"
//         onChange={handleFileChange}
//         ref={fileInputRef}
//         style={{ display: "none" }}
//       />
//       <Button variant="primary" onClick={handleButtonClick}>
//         Upload CSV
//       </Button>
//     </div>
//   );
// };

// export default CSVReader;


import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { parse } from "csv-parse/browser/esm";

const CSVReader = ({ onUpload, onHeaders, startRow = 1, sheetGid = "0" }) => {
  const [loading, setLoading] = useState(false);

  const fetchCSV = async () => {
    setLoading(true);
    const csvUrl = `https://docs.google.com/spreadsheets/d/1FprE5YzOXuu6fT0DB61F4vg5a9khF5FmY9vmSrZ4Bwk/export?format=csv&gid=${sheetGid}`;
    
    try {
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let csvData = await response.text();

      // Preprocess CSV data to remove or adjust headers and handle invalid quotes
      const lines = csvData.split('\n');
      const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
      const adjustedHeaders = headers.map(header => header.startsWith('=') ? 'Header' : header);
      lines[0] = adjustedHeaders.join(',');

      // Clean up invalid quotes in the data
      const cleanedLines = lines.map(line => line.replace(/"([^"]*)"/g, '$1'));

      csvData = cleanedLines.join('\n');

      parse(
        csvData,
        {
          columns: true, // Use the first row as headers
          skip_empty_lines: true, // Ignore empty lines
          trim: true, // Trim whitespace from headers and fields
          from_line: startRow, // Start parsing from the specified row
          relax: true, // Relax column count to handle inconsistent columns
          relax_column_count: true, // Allow rows with different numbers of columns
        },
        (err, records) => {
          if (err) {
            console.error("Error parsing CSV:", err);
            setLoading(false);
            return;
          }
          // console.log("Parsed records:", records);
          onHeaders(adjustedHeaders); // Pass headers to the parent
          onUpload(records); // Pass parsed data to the parent
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error fetching CSV:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={fetchCSV} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Fetch CSV from Google Sheets"}
      </Button>
    </div>
  );
};

export default CSVReader;