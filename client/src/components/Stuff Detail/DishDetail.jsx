import React, { useState } from 'react';
import axios from 'axios';

const DishDetail = ({ dish, onEditClick, onDeleteClick }) => {
    let state = 'available'; // Change const to let
    if (dish.state === 'false') {
        state = 'unavailable';
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editedDish, setEditedDish] = useState({ ...dish });

    const handleEditClick = () => {
        setIsEditing(true);
        onEditClick(dish);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset editedDish to the original values when canceling the edit
        setEditedDish({ ...dish });
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/dish/update_dish`,
                editedDish,
                {
                    headers: {
                        Authorization: localStorage.getItem('Saved Token'),
                    },
                }
            );

            console.log(response.data);

            // Update the local state to trigger re-render
            setEditedDish(editedDish);
            // Alternatively, you can directly update the state:
            // setEditedDish(editedDish);

        } catch (error) {
            console.error('Error updating dish:', error.response?.status, error.response?.data);
        }

        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDeleteClick(dish.dish_name); // Assuming you pass the dish id to onDeleteClick
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedDish((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h3>{dish.dish_name}</h3>
            <p>Type: {dish.dish_type}</p>
            <p>Description: {dish.description}</p>
            <p>State: {state}</p>

            {isEditing ? (
                <>
                    {/* Editing form */}
                    <label>
                        State:
                        <input
                            type="text"
                            name="state"
                            value={editedDish.state}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={editedDish.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Type:
                        <input
                            type="text"
                            name="description"
                            value={editedDish.dish_type}
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

export default DishDetail;
