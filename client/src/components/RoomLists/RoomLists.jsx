import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import './roomList.css'

const RoomLists = ({ onSelectRooms }) => {
    const [rooms, setRooms] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        // Gửi yêu cầu đến server để lấy danh sách bàn
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/room/available_rooms', { headers: { Authorization: localStorage.getItem('Saved Token') } });
                console.log(response.data)
                const { success, rooms } = response.data;
                const roomsWithIsChosen = rooms.map(room => ({
                    ...room,
                    isChosen: false,
                }));
                setRooms(roomsWithIsChosen); // Cập nhật state với danh sách bàn từ server
            } catch (error) {
                console.error('Lỗi khi lấy danh sách phòng:', error);
            }
        };

        fetchData();
    }, []); // Chạy chỉ một lần khi component được mount

    const handleCheckboxChange = (roomId) => {
        const updatedRooms = rooms.map((room) =>
            room.room_number === roomId ? { ...room, isChosen: !room.isChosen } : room
        );
    
        setRooms(updatedRooms);
    
        const updatedItems = updatedRooms
            .filter((room) => room.isChosen)
            .map((room) => ({ ...room }));
    
        onSelectRooms(updatedItems);
    };
    return (
        <div className="roomList">
            {rooms.map((room) => (
                <div key={room.room_number}>
                    {/* <img src={require(`./img/${table.table_type}.jpg`)} alt="" /> */}
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

    )
}

export default RoomLists