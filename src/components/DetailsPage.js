import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailsPage = () => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);
  const [details, setDetails] = useState({});
  const [editMode, setEditMode] = useState(false); // Track edit mode
  const [newColumn, setNewColumn] = useState('');
  const [newValue, setNewValue] = useState('');
  const [statusOptions, setStatusOptions] = useState([]); // Store the unique 'الحالة' options
  const [netaqOptions, setNetaqOptions] = useState([]); // Store the unique 'نطاق التطبيق' options
  const [error, setError] = useState(null); // Error state for handling fetch errors

  // Fetch the details of the item
  useEffect(() => {
    fetch(`http://localhost:8080/api/data/${decodedId}`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => {
        setError('Error fetching details');
        console.error('Error fetching details:', error);
      });

    // Fetch unique values for الحالة from the database
    fetch('http://localhost:8080/api/status-options')
      .then((response) => response.json())
      .then((data) => setStatusOptions(data))
      .catch((error) => {
        setError('Error fetching status options');
        console.error('Error fetching status options:', error);
      });

    // Fetch unique values for نطاق التطبيق from the database
    fetch('http://localhost:8080/api/netaq-options')
      .then((response) => response.json())
      .then((data) => setNetaqOptions(data))
      .catch((error) => {
        setError('Error fetching netaq options');
        console.error('Error fetching netaq options:', error);
      });
  }, [decodedId]);

  // Handle changes in editable fields
  const handleFieldChange = (key, value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  // Save the changes to the backend
  const handleSaveChanges = () => {
    fetch(`http://localhost:8080/api/data/${decodedId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data saved:', data);
        setEditMode(false); // Exit edit mode after saving
      })
      .catch((error) => {
        setError('Error saving changes');
        console.error('Error saving changes:', error);
      });
  };

  // Handle adding a new column
  const handleAddColumn = () => {
    if (newColumn && newValue) {
      const updatedDetails = { ...details, [newColumn]: newValue };
      setDetails(updatedDetails);

      // Send the new column to the backend to add it to the database
      fetch(`http://localhost:8080/api/data/${decodedId}/add-column`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          columnName: newColumn,
          value: newValue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('New column added:', data);
          setNewColumn(''); // Clear input fields
          setNewValue('');
        })
        .catch((error) => {
          setError('Error adding new column');
          console.error('Error adding new column:', error);
        });
    }
  };

  // Handle deleting a column
  const handleDeleteColumn = (columnName) => {
    // Remove the column from the local state
    const updatedDetails = { ...details };
    delete updatedDetails[columnName];
    setDetails(updatedDetails);

    // Send a request to the backend to delete the column
    fetch(`http://localhost:8080/api/data/${decodedId}/delete-column`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        columnName: columnName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Column deleted:', data);
      })
      .catch((error) => {
        setError('Error deleting column');
        console.error('Error deleting column:', error);
      });
  };

  // Identify numeric columns
  const numericColumns = Object.entries(details).filter(
    ([key, value]) => typeof value === 'number'
  );
  
  // Identify non-numeric columns
  const nonNumericColumns = Object.entries(details).filter(
    ([key, value]) => typeof value !== 'number'
  );

  return (
    <div className="container mt-4" dir="rtl">
      <h2 className="mb-3 text-end">تفاصيل العنصر: {decodedId}</h2>

      {/* Show error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-bordered">
        <tbody>
          {/* Render non-numeric columns first */}
          {nonNumericColumns
            .filter(([_, value]) => value !== null && value !== '' && value !== undefined) // Hide empty fields
            .map(([key, value]) => (
              <tr key={key}>
                <th className="bg-light text-end">{key}</th>
                <td className="text-end">
                  {editMode ? (
                    key === "الحالة" ? (
                      <select
                        className="form-control"
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                      >
                        <option value="">اختر الحالة</option>
                        {statusOptions.length > 0 && statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : key === "نطاق التطبيق" ? (
                      <select
                        className="form-control"
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                      >
                        <option value="">اختر نطاق التطبيق</option>
                        {netaqOptions.length > 0 && netaqOptions.map((netaq) => (
                          <option key={netaq} value={netaq}>
                            {netaq}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                      />
                    )
                  ) : (
                    value
                  )}
                </td>
                {/* Render delete column button */}
                {editMode && (
                  <td className="text-end">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteColumn(key)}
                    >
                      حذف
                    </button>
                  </td>
                )}
              </tr>
            ))}

          {/* Render numeric columns at the bottom */}
          {numericColumns
            .filter(([_, value]) => value !== null && value !== '' && value !== undefined) // Hide empty fields
            .map(([key, value]) => (
              <tr key={key}>
                <th className="bg-light text-end">{key}</th>
                <td className="text-end">
                  {editMode ? (
                    <input
                      type="number"
                      className="form-control"
                      value={value}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                    />
                  ) : (
                    value
                  )}
                </td>
                {/* Render delete column button */}
                {editMode && (
                  <td className="text-end">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteColumn(key)}
                    >
                      حذف العمود
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>

      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'الغاء' : 'تعديل'}
        </button>
        
        {editMode && (
          <button className="btn btn-success ms-2" onClick={handleSaveChanges}>
            حفظ التغييرات
          </button>
        )}
      </div>

      <div className="mb-3">
        <h3>إضافة عمود جديد</h3>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="اسم العمود الجديد"
              value={newColumn}
              onChange={(e) => setNewColumn(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="قيمة العمود الجديد"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-info mt-2" onClick={handleAddColumn}>
          إضافة العمود
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
