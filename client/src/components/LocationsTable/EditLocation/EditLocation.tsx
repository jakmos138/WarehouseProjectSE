import React, { useState } from 'react';
import axios from 'axios';
import './EditLocation.css';

const EditLocation = ({ item, onItemEdited, onClose }) => {
  const [newItem, setNewItem] = useState({
      locationId: item.location_id,
      name: item.name, 
      description: item.description, 
      restrictedLevel: item.restricted_level,
    });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const handleEditItem = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("restricted_level", newItem.restrictedLevel);

    axios.put(`http://localhost:3000/api/locations/${newItem.locationId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    })
    .then((response) => {
      onItemEdited(response.data.data);
      setNewItem({
        locationId: '', 
        name: '', 
        description: '', 
        restrictedLevel: '',
      });
      onClose(); // Close modal after success
    })
    .catch((err) => {
      setError("Error editing item");
    });
  };

  return (
    <div className="modal-overlay">
      <div className="create-item-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        {error && <div className="error-message">{error}</div>}
        <form className='create-item-form' onSubmit={handleEditItem}>
          <label>
            Name:
            <input type="text" name="name" value={newItem.name} onChange={handleInputChange} required />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={newItem.description} onChange={handleInputChange} required />
          </label>
          <label>
            Restricted Level:
            <input type="number" name="restrictedLevel" value={newItem.restrictedLevel} onChange={handleInputChange} required />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditLocation;
