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
        onDeleteClick(dish.id); // Assuming you pass the dish id to onDeleteClick
    };

    const handleInputChange = (event) =>
        setEditedDish((prev) => ({ ...prev, [event.target.name]: event.target.value }));

    return (
        <div>
            <h3>{dish.name}</h3>
            <p>Description: {dish.description}</p>
            <p>State: {state}</p>
            <p>Price: {dish.price}</p>

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
                        State:
                        <input
                            type="text"
                            name="state"
                            value={editedDish.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="text"
                            name="price"
                            value={editedDish.price}
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
