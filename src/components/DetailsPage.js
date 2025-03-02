import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);
  console.log(decodedId)
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch(`http://springboot:8080/api/data/${decodedId}`)
    
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => console.error('Error fetching details:', error));
  }, [decodedId]);

  return (
    <div>
      <h2>Details for ID: {decodedId}</h2>
      <ul>
        {Object.entries(details).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailsPage;
