import React, { useState } from 'react';
import axios from 'axios';

const TableDetail = ({ table, onEditClick, onDeleteClick }) => {
    let state = 'available'; // Change const to let
    if (table.state === 'false') {
        state = 'unavailable';
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editedTable, setEditedTable] = useState({ ...table });

    const handleEditClick = () => {
        setIsEditing(true);
        onEditClick(table);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/table/update_table`,
                editedTable,
                {
                    headers: {
                        Authorization: localStorage.getItem('Saved Token'),
                    },
                }
            );

            console.log(response.data);

            // Cập nhật state local để render lại ngay lập tức
            setEditedTable(editedTable);

            // Hoặc có thể cập nhật trực tiếp:
            // setEditedTable(editedTable);

        } catch (error) {
            console.error('Error updating table:', error.response?.status, error.response?.data);
        }

        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDeleteClick(table.table_number);
    };

    const handleInputChange = (event) =>
        setEditedTable((prev) => ({ ...prev, [event.target.name]: event.target.value }));

    return (
        <div>
            <h3>{table.table_type}</h3>
            <p>Table number: {table.table_number}</p>
            <p>State: {state}</p>
            <p>Price: {table.price}</p>

            {isEditing ? (
                <>
                    {/* Editing form */}
                    <label>
                        State:
                        <input
                            type="text"
                            name="state"
                            value={editedTable.state}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="text"
                            name="price"
                            value={editedTable.price}
                            onChange={handleInputChange}
                        />
                    </label>

                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={handleEditClick}>Edit</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </>
            )}
        </div>
    );
};

export default TableDetail;
