import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MainTable from './components/MainTable';

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // Fetch columns from the server
  useEffect(() => {
    axios.get('http://springboot:8080/api/data/columns')
      .then(response => {
        setColumns(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the columns!", error);
      });
  }, []);

  // Fetch paginated data from the server
  useEffect(() => {
    axios.get(`http://springboot:8080/api/data?page=${page}&size=${size}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, [page, size]);

  // Change page size
  const handlePageSizeChange = (e) => {
    setSize(Number(e.target.value));
    setPage(0);  // Reset to first page when size changes
  };

  // Change page number
  const handlePageChange = (e) => {
    setPage(Number(e.target.value));
  };

  return (
    <div className="App">
      <h1>Dynamic Data Table</h1>

      <div className="pagination-controls">
        <label>
          Page Size:
          <select value={size} onChange={handlePageSizeChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>

        <label>
          Page Number:
          <input 
            type="number" 
            value={page} 
            onChange={handlePageChange} 
            min="0" 
            max="100"
          />
        </label>
      </div>

      {/* Passing data and columns to the MainTable */}
      <MainTable data={data} columns={columns} />
    </div>
  );
}

export default App;
