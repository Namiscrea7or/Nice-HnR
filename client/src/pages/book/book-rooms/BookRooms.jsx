import React from 'react';
import RoomsForm from '../../../components/RoomsForm/RoomsForm';
import Rooms from '../../../components/Rooms/Rooms'
import RoomLists from '../../../components/RoomLists/RoomLists';
import './BookRooms.css';

const BookRooms = () => {
//fetch data 
  const dataRoom = null
  return (
    <div className='bookRoomContainer'>
      <div><RoomLists/></div>
      <div><RoomsForm /></div>
    </div>
  );
};

export default BookRooms;
