import React, { useState, useEffect } from 'react';
import RoomLists from '../../../components/RoomLists/RoomLists';
import RoomsForm from '../../../components/RoomsForm/RoomsForm'
import './BookRooms.css';

const BookRooms = () => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleSelectRooms = (selectedItems) => {
    setSelectedRooms(selectedItems);
  };
  return (
    <div className='bookRoomContainer'>

      <div className='rl'>
      <h2>Đặt Phòng tại đây</h2>
        <RoomLists onSelectRooms = {handleSelectRooms} /></div>
      <div className='rf'><RoomsForm selectedRooms={selectedRooms} /></div>
    </div>
  );
};

export default BookRooms;
