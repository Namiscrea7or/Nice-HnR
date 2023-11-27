import React from 'react';
import RoomsForm from '../../../components/RoomsForm/RoomsForm';
import Rooms from '../../../components/Rooms/Rooms'
import './BookRooms.css';

const BookRooms = () => {

  return (
    <div className='bookRoomContainer'>
      <div><Rooms/></div>
      <div><RoomsForm /></div>
    </div>
  );
};

export default BookRooms;
