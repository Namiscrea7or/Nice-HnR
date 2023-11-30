import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'

const RoomLists = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        // Gửi yêu cầu đến server để lấy danh sách bàn
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/room/add_room', { headers: { Authorization: localStorage.getItem('Saved Token') } });
                console.log(response.data)
                const roomsWithIsChosen = response.data.map(room => ({
                    ...room,
                    isChosen: false,
                }));    
                setRooms(roomsWithIsChosen); // Cập nhật state với danh sách bàn từ server
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bàn:', error);
            }
        };

        fetchData();
    }, []); // Chạy chỉ một lần khi component được mount

    const handleCheckboxChange = (roomId) => {
        const updatedRooms = rooms.map((room) =>
            room.id === roomId ? { ...room, isChosen: !room.isChosen } : room
        );

        setRooms(updatedRooms);

        const updatedItems = updatedRooms
            .filter((room) => room.isChosen)
            .map((room) => room.id);

        setSelectedItems(updatedItems);
    };
    return (
        <div className='bookRoom'>
            <h1 id='bookingRoomHeader'>Đặt bàn ăn tại khách sạn</h1>
            <form id='roomForm'>
                <div className="roomList">
                    {rooms.map((room) => (
                        <div key={room.id}>
                            {/* <img src={require(`./img/${table.table_type}.jpg`)} alt="" /> */}
                            <div className="room_info">
                                <input
                                    type="checkbox"
                                    checked={room.isChosen}
                                    onChange={() => handleCheckboxChange(room.id)}
                                />
                                <h2>Loại phòng: {room.room_type}</h2>
                                <p>Số phòng: {room.room_number}</p>
                                <p>Giá phòng: {room.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default RoomLists