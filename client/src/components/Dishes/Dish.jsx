import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dish.css';

const Dish = () => {
    const [dish, setDish] = useState([]);
    const [error, setError] = useState({});
    function state(state) {
        if (state === 'true') {
            return 'available'
        }
        else {
            return 'unavailable'
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dish/get_all_dish_public');
                console.log(response.data)
                const {success, dishes} = response.data
                setDish(dishes);
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
                        <p>Loại: {dishItem.dish_type}</p>
                        <p>Mô tả: {dishItem.description}</p>
                        <p>Trạng thái: {state(dishItem.state)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dish;
