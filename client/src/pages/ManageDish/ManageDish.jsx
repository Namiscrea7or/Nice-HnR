// ManageDish.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DishDetail from '../../components/Stuff Detail/DishDetail';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
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
                const response = await axios.get('http://localhost:5000/api/dish/get_all_dish', {
                    headers: { Authorization: localStorage.getItem('Saved Token') },
                });
                console.log(response.data)
                const { success, dishs } = response.data;
                setDishes(dishs);
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
            console.log(newDish);
            const response = await axios.post('http://localhost:5000/api/dish/add_dish', newDish, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });
            const { success, dish } = response.data;

            // Update the state by adding the new dish
            if (!dish.find(t => t.dish_name === dish.dish_name)) {
                setDishes(prevDish => [...prevDish, dish]);
            }

            setNewDish({
                dish_name: '',
                description: '',
                state: '',
                price: '',
                discount: ''
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
            <Navbar/>
            <div className="blank"></div>
            <h2>Manage dishes</h2>
            <ul>
                {dishes.map((dish) => (
                    <li key={dish.dish_name}>
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
                                value={newDish.dish_name}
                                onChange={(e) => setNewDish({ ...newDish, dish_name: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>Description:
                            <input
                                type="text"
                                value={newDish.description}
                                onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>State:
                            <input
                                type="text"
                                value={newDish.state}
                                onChange={(e) => setNewDish({ ...newDish, state: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>Price:
                            <input
                                type="text"  // Chuyển type về text để có thể tự do nhập số
                                inputMode="numeric"  // Chỉ cho phép nhập số
                                pattern="[0-9]*"  // Bảo đảm chỉ nhập ký tự số
                                name="price"
                                value={newDish.price}
                                onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>Discount:
                            <input
                                type="text"  // Chuyển type về text để có thể tự do nhập số
                                inputMode="numeric"  // Chỉ cho phép nhập số
                                pattern="[0-9]*"  // Bảo đảm chỉ nhập ký tự số
                                name="discount"
                                value={newDish.discount}
                                onChange={(e) => setNewDish({ ...newDish, discount: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <button type="submit" onClick={handleAddDishSubmit}>Submit</button>
                        <button type="button" onClick={handleCancelAddDish}>Cancel</button>
                    </form>
                </div>
            )}
            <button onClick={handleAddClick}>Add new dish</button>
        </div>
    );
};

export default ManageDish;
