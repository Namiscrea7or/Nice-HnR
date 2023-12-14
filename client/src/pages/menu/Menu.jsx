import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dish from '../../components/Dishes/Dish'
import Navbar from '../../components/navbar/Navbar'
import './Menu.css'
import food1 from './food.jpg';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   axios.get('api ở đây')
    //     .then((response) => setRooms(response.data))
    //     .catch((err) => setError(err));
    // }, []);
  
    // if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div className="index">
        <Navbar />
        <img className="background" alt="background" src={food1}/>
        <div className="text-wrapper-0">Discover Our Menus</div>
        <div className="overlap-1">
          <Dish/>
        </div>
      </div>
    );
}

export default Menu