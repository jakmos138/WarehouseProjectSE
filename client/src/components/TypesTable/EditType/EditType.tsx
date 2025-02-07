import React, { useState } from 'react';
import axios from 'axios';
import './EditType.css';

const EditType = ({ item, onItemEdited, onClose }) => {
  const [newItem, setNewItem] = useState({
      typeId: item.item_id,
      name: item.name, 
      description: item.description, 
      price: item.price,
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
    formData.append("price", newItem.price);
    formData.append("restricted_level", newItem.restrictedLevel);

    axios.put(`http://localhost:3000/api/itemtypes/${newItem.typeId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    })
    .then((response) => {
      onItemEdited(response.data.data);
      setNewItem({
        typeId: '', 
        name: '', 
        description: '', 
        price: '',
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
            Price:
            <input type="number" name="price" value={newItem.price} onChange={handleInputChange} required />
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

export default EditType;
