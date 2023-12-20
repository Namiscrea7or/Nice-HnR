import React, { useState } from 'react';
import axios from 'axios';
import './dish.css'

const DishDetail = ({ dish, onEditClick, onDeleteClick }) => {
    let state = 'available'; 
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
            setEditedDish(editedDish);
        } catch (error) {
            console.error('Error updating dish:', error.response?.status, error.response?.data);
        }

        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDeleteClick(dish.dish_name);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedDish((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='DishDetail'>
            <img src={require ('./img/dessert1.jpg')} alt="dish photo" />
            <h3>{dish.dish_name}</h3>
            <p>Type: {dish.dish_type}</p>
            <p>Description: {dish.description}</p>
            <p>State: {state}</p>

            {isEditing ? (
                <>
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
                    <button className='edit' onClick={handleSaveEdit}>Save</button>
                    <button className='danger' onClick={handleCancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <button className='edit' onClick={handleEditClick}>Edit</button>
                    <button className='danger' onClick={handleDeleteClick}>Delete</button>
                </>
            )}
        </div>
    );
};

export default DishDetail;
