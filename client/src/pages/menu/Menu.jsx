import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dish from '../../components/Dishes/Dish'
import Navbar from '../../components/navbar/Navbar'
import './Menu.css'
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
      <div className='menuContainer'>
        <Navbar />
        <div className="menu_bg"></div>
        <Dish />
      </div>
    );
}

export default Menu