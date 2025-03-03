import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainTable = ({ data, columns }) => {
  const [filters, setFilters] = useState({});

  if (!data || data.length === 0) {
    return <p className="text-center text-muted">No data available</p>;
  }

  // Handle changes in column filter input
  const handleFilterChange = (column, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value,
    }));
  };

  // Filter the data based on column-specific filters
  const filteredData = data.filter(item => 
    columns.every(column => {
      const filterValue = filters[column] || '';
      if (!filterValue) return true; // If there's no filter for the column, keep it
      return String(item[column]).toLowerCase().includes(filterValue.toLowerCase());
    })
  );

  // Determine which columns should be visible (non-empty columns)
  const visibleColumns = columns.filter(column => 
    data.some(item => item[column] !== null && item[column] !== '' && item[column] !== undefined)
  );

  return (
    <div className="table-responsive" dir="rtl">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            {visibleColumns.map((column, index) => (
              <th key={index} className="text-truncate" style={{ maxWidth: '200px' }}>
                {column}
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder={`Filter by ${column}`}
                    value={filters[column] || ''}
                    onChange={(e) => handleFilterChange(column, e.target.value)}
                  />
                </div>
              </th>
            ))}
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {visibleColumns.map((column, idx) => (
                  <td 
                    key={idx} 
                    className="text-truncate" 
                    style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} 
                    title={item[column]}>
                    {item[column]}
                  </td>
                ))}
                <td className="text-end">
                  <Link to={`/details/${encodeURIComponent(item[columns[0]])}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={visibleColumns.length + 1} className="text-center">
                No results found for the applied filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
