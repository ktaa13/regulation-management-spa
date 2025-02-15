import React, { useState, useEffect } from 'react';
import './App.css';

// DataTable component to display the uploaded data
function DataTable({ data }) {
  if (!data) return <div>Loading...</div>;

  const columns = Object.keys(data[0] || {});
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Main App component to handle file upload and display data
function App() {
  const [jsonData, setJsonData] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch stored data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/data');
      if (response.ok) {
        const data = await response.json();
        setJsonData(data);
      } else {
        alert('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      alert('Please choose a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    try {
      const response = await fetch('http://localhost:8080/api/upload', { // Replace with your backend API URL
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      alert('File uploaded successfully');
      fetchData(); // Refresh the data after successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  return (
    <div className="App">
      <h1>React + Spring Boot + Excel File Upload</h1>

      {/* File upload section */}
      <div>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
        <button onClick={handleFileUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Excel File'}
        </button>
      </div>

      <h2>Stored Data</h2>
      <DataTable data={jsonData} />
    </div>
  );
}

export default App;
