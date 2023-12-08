// ManageDish.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DishDetail from '../../components/Stuff Detail/DishDetail';
import { useNavigate } from 'react-router-dom';

const ManageDish = () => {
    const history = useNavigate();
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({
        name: '',
        description: '',
        price: '',
        // Add other properties as needed
    });
    const onChangeDishForm = event => setNewDish(prev => ({ ...prev, [event.target.name]: event.target.value }));
    const [editDish, setEditDish] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dish/get_dish_list', {
                    headers: { Authorization: localStorage.getItem('Saved Token') },
                });
                const { success, dishList } = response.data;
                setDishes(dishList);
            } catch (error) {
                console.error('Error fetching dishes:', error.response?.status, error.response?.data);
            }
        };

        fetchData();
    }, []);

    const handleDeleteDish = async (dishId) => {
        try {
            await axios.delete(`http://localhost:5000/api/dish/${dishId}`, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });

            // Update the state by removing the deleted dish
            setDishes((prevDishes) => prevDishes.filter(dish => dish.id !== dishId));

        } catch (e) {
            console.error('Error deleting dish:', e.response?.status, e.response?.data);
        }
    };

    const handleEditClick = async (dish) => {
        setEditDish({ ...dish });
    };

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleAddDishSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/dish/add_dish', newDish, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });
            const { success, dish } = response.data;

            // Update the state by adding the new dish
            setDishes(prevDishes => [...prevDishes, dish]);

            setNewDish({
                name: '',
                description: '',
                price: '',
                // Reset other properties as needed
            });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding dish:', error.response?.status, error.response?.data);
        }
    };

    const handleCancelAddDish = () => {
        setShowAddForm(false);
    };

    return (
        <div>
            <h2>Manage dishes</h2>
            <ul>
                {dishes.map((dish) => (
                    <li key={dish.id}>
                        <DishDetail
                            dish={dish}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteDish}
                        />
                    </li>
                ))}
            </ul>
            {showAddForm && (
                <div>
                    <h3>Add new dish</h3>
                    <form onSubmit={handleAddDishSubmit}>
                        {/* Your form fields go here */}
                        <label>Name:
                            <input
                                type="text"
                                value={newDish.name}
                                onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                                required
                            />
                        </label>
                        {/* Add other form fields as needed */}
                        <br />
                        <button type="submit">Submit</button>
                        <button type="button" onClick={handleCancelAddDish}>Cancel</button>
                    </form>
                </div>
            )}
            <button onClick={handleAddClick}>Add new dish</button>
        </div>
    );
};

export default ManageDish;
