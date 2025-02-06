import React, { useState } from 'react';
import axios from 'axios';
import './CreateItem.css';

const CreateItem = ({ onItemCreated, onClose }) => {
  const [newItem, setNewItem] = useState({
    itemId: '', 
    locationId: '', 
    details: '', 
    quantity: '',
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
    formData.append("item_id", newItem.itemId);
    formData.append("location_id", newItem.locationId);
    formData.append("details", newItem.details);
    formData.append("quantity", newItem.quantity);
    formData.append("restricted_level", newItem.restrictedLevel);

    axios.post('http://localhost:3000/api/items/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    })
    .then((response) => {
      onItemCreated(response.data.data);
      setNewItem({ itemId: '', locationId: '', details: '', quantity: '', restrictedLevel: '' });
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
            Item ID:
            <input type="text" name="itemId" value={newItem.itemId} onChange={handleInputChange} required />
          </label>
          <label>
            Location ID:
            <input type="text" name="locationId" value={newItem.locationId} onChange={handleInputChange} required />
          </label>
          <label>
            Details:
            <input type="text" name="details" value={newItem.details} onChange={handleInputChange} required />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" value={newItem.quantity} onChange={handleInputChange} required />
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

export default CreateItem;
