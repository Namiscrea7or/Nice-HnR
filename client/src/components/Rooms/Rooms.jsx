import React from 'react'
import './Rooms.css'

const Rooms = ({ roomDatassssss }) => {
  // Render thông tin phòng khách sạn ở đây
  const roomData = {
    room_type: 1,
    room_number: 13630,
    description: 'Giỡn không vui',
    state: 'true',
    price: 300000
  }
  let states = ''
  if (roomData.state === 'true') {
    states = 'available'
  }
  return (
    <div className='roomContainer'>
      <img src={require(`./img/${roomData.room_type}.jpg`)} alt="" />
      <div className="room_info">
        <h2>Loại phòng: {roomData.room_type}</h2>
        <p>Số phòng: {roomData.room_number}</p>
        <p>Mô tả: {roomData.description}</p>
        <p>Trạng thái: {states}</p>
        <p>Giá phòng: {roomData.price}</p>
      </div>
    </div>
  );
};

export default Rooms