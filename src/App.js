import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainTable from './components/MainTable';

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // Fetch columns from the server
  useEffect(() => {
    axios.get('http://localhost:8080/api/data/columns')
      .then(response => {
        setColumns(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the columns!", error);
      });
  }, []);

  // Fetch paginated data from the server
  useEffect(() => {
    axios.get(`http://localhost:8080/api/data?page=${page}&size=${size}`)
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
    <div className="container mt-4" dir="rtl">  {/* RTL Support */}
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-end"> {/* Align text to the right */}
          <h2 className="mb-0">جدول البيانات الديناميكي</h2> {/* Arabic title */}
        </div>

        <div className="card-body">
          {/* Pagination Controls */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">حجم الصفحة:</label>
              <select className="form-select" value={size} onChange={handlePageSizeChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">رقم الصفحة:</label>
              <input 
                type="number" 
                className="form-control"
                value={page} 
                onChange={handlePageChange} 
                min="0" 
                max="100"
              />
            </div>
          </div>

          {/* Data Table */}
          <MainTable data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default App;
