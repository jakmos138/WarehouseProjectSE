import React, { useState } from 'react';
import axios from 'axios';
import './EditItem.css';
import EditItemDropdown from './EditItemDropdown/EditItemDropdown';

const EditItem = ({ item, onItemEdited, onClose, locations }) => {
  const [newItem, setNewItem] = useState({
    itemIndex: item.item_index,
    locationId: item.location.location_id, 
    details: item.details, 
    quantity: item.quantity,
    restrictedLevel: item.restricted_level
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
    formData.append("location_id", newItem.locationId);
    formData.append("details", newItem.details);
    formData.append("quantity", newItem.quantity);
    formData.append("restricted_level", newItem.restrictedLevel);

    axios.put(`http://localhost:3000/api/items/${newItem.itemIndex}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    })
    .then((response) => {
      onItemEdited(response.data.data);
      setNewItem({ itemIndex: '', locationId: '', details: '', quantity: '', restrictedLevel: '' });
      onClose(); // Close modal after success
    })
    .catch((err) => {
      setError("Error editing item");
    });
  };

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
        <form className='create-item-form' onSubmit={handleEditItem}>
          <EditItemDropdown locations={locations}
            onLocationIdUpdate={onLocationIdUpdate}/>
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
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
