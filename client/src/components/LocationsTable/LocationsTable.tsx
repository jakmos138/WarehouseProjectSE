import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Location from './Location/Location';
import './LocationsTable.css';
import CreateLocation from './CreateLocation/CreateLocation';
import EditLocation from './EditLocation/EditLocation';



const LocationsTable = () => {
    const [data, setData] = useState([]);  // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors
    const [showCreateForm, setShowCreateForm] = useState(false); // State to manage form visibility
    const [showEditForm, setShowEditForm] = useState(false); // State to manage form visibility
    const [editFormItem, setEditFormItem] = useState({}) // for edit form

    useEffect(() => {
        axios.get('http://localhost:3000/api/locations/', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })
        .then((response) => {
            setData(response.data.data);
            console.log(response.data.data);
            setLoading(false);
        })
        .catch((err) => {
            setError("Error fetching data (locations)");
            setLoading(false);
        });
    }, []);

    const deleteItem = (itemId) => {
        axios.delete(`http://localhost:3000/api/locations/${itemId}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })
        .then((response) => {
            setData(data.filter(item => item.location_id !== itemId));
        })
        .catch((err) => {
            setError("Error deleting item");
        });
    };

    const showUpdateItem = (item) => {
        console.log("Edit following item type:");
        console.log(item);
        setEditFormItem(item);
        setShowEditForm(!showEditForm);
    }


    const handleItemCreated = (newItem) => {
        setData([...data, newItem]);  // Add the newly created item to the list
        setShowCreateForm(false);  // Hide the form after submission
    };

    const handleItemEdited = (editedItem) => {
        let e = [...data].map(f => {
            if (f.location_id === editedItem.location_id) return editedItem;
            else return f;
        });
        setData(e);
        console.log(data);
        setShowCreateForm(false);  // Hide the form after submission
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="locations-table">
            <div className="create-item-button-container">
            <button onClick={() => setShowCreateForm(!showCreateForm)} className="create-item-btn">
                {showCreateForm ? 'Cancel' : 'Create Location'}
            </button>
            </div>


            {/* Modal for CreateItem */}
            {showCreateForm && (
                <div className="modal-overlay">
                    <CreateLocation onItemCreated={handleItemCreated} onClose={() => setShowCreateForm(false)} />
                </div>
            )}

            {showEditForm && (
                <div className="modal-overlay">
                    <EditLocation item={editFormItem} onItemEdited={handleItemEdited} onClose={() => setShowEditForm(false)} />
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <Location
                                key={index}
                                name={item.name}
                                description={item.description}
                                deleteItem={() => deleteItem(item.location_id)}
                                updateItem={() => showUpdateItem(item)}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No types found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LocationsTable;
