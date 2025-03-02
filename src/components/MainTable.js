import React from 'react';
import { Link } from 'react-router-dom';

const MainTable = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>{columns[0]}</th> {/* Ensure the first column (ID) is displayed */}
          {columns.slice(1, 9).map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item[columns[0]]}>
            <td>{item[columns[0]]}</td> {/* Display the ID */}
            {columns.slice(1, 9).map((column, idx) => (
              <td key={idx}>{item[column]}</td>
            ))}
            <td>
              <Link to={`/details/${encodeURIComponent(item[columns[0]])}`}>View Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainTable;
