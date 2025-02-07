import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Type from './Type/Type';
import './TypesTable.css';
import CreateType from './CreateType/CreateType';
import EditType from './EditType/EditType';



const TypesTable = () => {
    const [data, setData] = useState([]);  // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors
    const [showCreateForm, setShowCreateForm] = useState(false); // State to manage form visibility
    const [showEditForm, setShowEditForm] = useState(false); // State to manage form visibility
    const [editFormItem, setEditFormItem] = useState({}) // for edit form

    useEffect(() => {
        axios.get('http://localhost:3000/api/itemtypes/', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })
        .then((response) => {
            setData(response.data.data);
            console.log(response.data.data);
            setLoading(false);
        })
        .catch((err) => {
            setError("Error fetching data (item types)");
            setLoading(false);
        });
    }, []);

    const deleteItem = (itemId) => {
        axios.delete(`http://localhost:3000/api/itemTypes/${itemId}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })
        .then((response) => {
            setData(data.filter(item => item.item_id !== itemId));
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
            if (f.item_id === editedItem.item_id) return editedItem;
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
        <div className="types-table">
            <div className="create-item-button-container">
            <button onClick={() => setShowCreateForm(!showCreateForm)} className="create-item-btn">
                {showCreateForm ? 'Cancel' : 'Create Item Type'}
            </button>
            </div>


            {/* Modal for CreateItem */}
            {showCreateForm && (
                <div className="modal-overlay">
                    <CreateType onItemCreated={handleItemCreated} onClose={() => setShowCreateForm(false)} />
                </div>
            )}

            {showEditForm && (
                <div className="modal-overlay">
                    <EditType item={editFormItem} onItemEdited={handleItemEdited} onClose={() => setShowEditForm(false)} />
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <Type
                                key={index}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                deleteItem={() => deleteItem(item.item_id)}
                                updateItem={() => showUpdateItem(item)}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No types found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TypesTable;
