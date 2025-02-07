import React, { useState } from 'react';
import axios from 'axios';
import './CreateLocation.css';

const CreateLocation = ({ onItemCreated, onClose }) => {
  const [newItem, setNewItem] = useState({
    name: '', 
    description: '',
    restrictedLevel: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const handleCreateItem = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("restricted_level", newItem.restrictedLevel);

    axios.post('http://localhost:3000/api/locations/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    })
    .then((response) => {
      onItemCreated(response.data.data);
      setNewItem({
        name: '', 
        description: '', 
        restrictedLevel: '',
      });
      onClose(); // Close modal after success
    })
    .catch((err) => {
      setError("Error creating item");
    });
  };

  return (
    <div className="modal-overlay">
      <div className="create-item-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        {error && <div className="error-message">{error}</div>}
        <form className='create-item-form' onSubmit={handleCreateItem}>
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
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateLocation;
