import React, { useState } from 'react';
import axios from 'axios';
import './CreateItem.css';
import CreateItemDropdown from './CreateItemDropdown/CreateItemDropdown';

const CreateItem = ({ onItemCreated, onClose, types, locations }) => {
  const [newItem, setNewItem] = useState({
    itemIndex: '', 
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
    formData.append("item_id", newItem.itemIndex);
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
      setNewItem({ itemIndex: '', locationId: '', details: '', quantity: '', restrictedLevel: '' });
      onClose(); // Close modal after success
    })
    .catch((err) => {
      setError("Error creating item");
    });
  };

  const onTypeIdUpdate = (e) => {
    setNewItem({
      ...newItem,
      itemIndex: e
    });
  }

  const onLocationIdUpdate = (e) => {
    setNewItem({
      ...newItem,
      locationId: e
    });
  }

  return (
    <div className="modal-overlay">
      <div className="create-item-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        {error && <div className="error-message">{error}</div>}
        <form className='create-item-form' onSubmit={handleCreateItem}>
          <CreateItemDropdown types={types} locations={locations}
            onTypeIdUpdate={onTypeIdUpdate} onLocationIdUpdate={onLocationIdUpdate}/>
          <input type="hidden" name="itemId" value={newItem.itemIndex} required />
          <input type="hidden" name="locationId" value={newItem.locationId} required />
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
