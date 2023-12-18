import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import './roomList.css'

const RoomLists = ({ onSelectRooms }) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/room/available_rooms', { headers: { Authorization: localStorage.getItem('Saved Token') } });
                const { success, rooms } = response.data;
                const roomsWithIsChosen = rooms.map(room => ({
                    ...room,
                    isChosen: false,
                }));
                setRooms(roomsWithIsChosen);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách phòng:', error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (roomId) => {
        const updatedRooms = rooms.map((room) => ({
            ...room,
            isChosen: room.room_number === roomId ? !room.isChosen : false,
        }));

        setRooms(updatedRooms);

        const selectedRoom = updatedRooms.find((room) => room.isChosen);

        onSelectRooms(selectedRoom);
    };

    return (
        <div className="roomList">
            {rooms.map((room) => (
                <div key={room.room_number}>
                    <div className="room_info">
                        <h2>Loại phòng: {room.room_type}</h2>
                        <p>Số phòng: {room.room_number}</p>
                        <p>Capacity: {room.capacity}</p>
                        <p>Giá phòng: {room.price}</p>
                        <p>Discount: {room.discount}</p>
                        <input
                            type="checkbox"
                            checked={room.isChosen}
                            onChange={() => handleCheckboxChange(room.room_number)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RoomLists;
