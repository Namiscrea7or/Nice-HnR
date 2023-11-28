import React from 'react';
import RoomsForm from '../../../components/RoomsForm/RoomsForm';
import Rooms from '../../../components/Rooms/Rooms'
import './BookRooms.css';

const BookRooms = () => {
//fetch data 
  const dataRoom = null
  return (
    <div className='bookRoomContainer'>
      <div><Rooms roomDatassssss = {dataRoom}/></div>
      <div><RoomsForm /></div>
    </div>
  );
};

export default BookRooms;
