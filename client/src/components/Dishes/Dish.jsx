import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dish.css';

const Dish = () => {
    const [dish, setDish] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dish/get_all_available_dish', { headers: { Authorization: localStorage.getItem('Saved Token') } });
                const {success, dishs} = response.data
                setDish(dishs);
            } catch (error) {
                console.error('Error fetching dish list:', error);
                setError(error);
            }
        };

        fetchData();
    }, []); // Run only once when the component is mounted

    return (
        <div className='dishContainer'>
            {dish.map((dishItem, index) => (
                <div key={index} className='dish'>
                    {/* <img src={require(`./img/${dishItem.dish_name}.jpg`)} alt="" /> */}
                    <h2>Tên món: {dishItem.dish_name}</h2>
                    <div className='dishInfo'>
                        <p>Mô tả: {dishItem.description}</p>
                        <p>Trạng thái: {/* Add the status property here if available in your data */}</p>
                        <p>Giá: {dishItem.price}</p>
                        <p>Giảm giá: {dishItem.discount}%</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dish;
