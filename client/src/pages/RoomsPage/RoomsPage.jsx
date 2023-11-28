import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rooms from '../../components/Rooms/Rooms'
import Navbar from '../../components/navbar/Navbar'
import './RoomsPage.css'

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   axios.get('api ở đây')
    //     .then((response) => setRooms(response.data))
    //     .catch((err) => setError(err));
    // }, []);
  
    // if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div className='roomPageContainer'>
        <Navbar />
        <div className="rp_bg"></div>
        {/* {rooms.map((room) => (
          <Rooms key={room.number} roomData={room} />
        ))} */}
        <Rooms />
        <Rooms />
      </div>
    );
}

export default RoomsPage