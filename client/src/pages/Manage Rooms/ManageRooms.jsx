// ManageUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomDetail from '../../components/Stuff Detail/RoomDetail';
import { useNavigate } from 'react-router-dom';

const ManageRooms = () => {
    const history = useNavigate()
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState({
        room_type: '',
        room_number: '',
        description: '',
        capacity: 0,
        state: '',
        discount: 0,
        price: 0
    });
    const onChangeRoomForm = event => setNewRoom(prev => ({ ...prev, [event.target.name]: event.target.value }))
    const [editroom, setEditroom] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/room/all_rooms', {
                    headers: { Authorization: localStorage.getItem('Saved Token') },
                });
                const { success, rooms } = response.data;
                console.log(rooms)
                setRooms(rooms);
            } catch (error) {
                console.error('Error fetching rooms:', error.response?.status, error.response?.data);
            }
        };

        fetchData();
    }, []);



    const handleDeleteroom = async (roomId) => {
        try {
            await axios.delete(`http://localhost:5000/api/room/${roomId}`, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });

            // Update the state by removing the deleted room
            setRooms((prevRooms) => prevRooms.filter(room => room.room_number !== roomId));

        } catch (e) {
            console.error('Error deleting room:', e.response?.status, e.response?.data);
        }
    };

    const handleEditClick = async (room) => {
        setEditroom({ ...room });
    };

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleAddRoomSubmit = async () => {
        try {
            console.log(newRoom);
            const response = await axios.post('http://localhost:5000/api/room/add_room', newRoom, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });
            const { success, room } = response.data;
            // Cập nhật danh sách phòng sau khi thêm
            setRooms(prevRooms => [...prevRooms, room]);
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding room:', error.response?.status, error.response?.data);
        }
    };
    const handleCancelAddRoom = () => {

        setShowAddForm(false);
    };

    return (
        <div>
            <h2>Manage rooms</h2>
            <ul>
                {rooms.map((room) => (
                    <li key={room.room_number}>
                        <RoomDetail
                            room={room}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteroom}
                        />
                    </li>
                ))}
            </ul>
            {showAddForm && (
                <div>
                    <h3>Add new room</h3>
                    <form onSubmit={handleAddRoomSubmit}>
                        <label>Room Type:
                            <input
                                type="text"
                                value={newRoom.room_type}
                                onChange={(e) => setNewRoom({ ...newRoom, room_type: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>Room number:
                            <input
                                type="text"
                                value={newRoom.room_number}
                                onChange={(e) => setNewRoom({ ...newRoom, room_number: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>Capacity:
                            <input
                                type="text"  // Chuyển type về text để có thể tự do nhập số
                                inputMode="numeric"  // Chỉ cho phép nhập số
                                pattern="[0-9]*"  // Bảo đảm chỉ nhập ký tự số
                                name="price"
                                value={newRoom.capacity}
                                onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>State:
                            <input
                                type="text"
                                value={newRoom.state}
                                onChange={(e) => setNewRoom({ ...newRoom, state: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>Price:
                            <input
                                type="text"  // Chuyển type về text để có thể tự do nhập số
                                inputMode="numeric"  // Chỉ cho phép nhập số
                                pattern="[0-9]*"  // Bảo đảm chỉ nhập ký tự số
                                name="price"
                                value={newRoom.price}
                                onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>Discount:
                            <input
                                type="text"  // Chuyển type về text để có thể tự do nhập số
                                inputMode="numeric"  // Chỉ cho phép nhập số
                                pattern="[0-9]*"  // Bảo đảm chỉ nhập ký tự số
                                name="discount"
                                value={newRoom.discount}
                                onChange={(e) => setNewRoom({ ...newRoom, discount: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <button type="submit" onClick={handleAddRoomSubmit}>Gửi</button>
                        <button type="button" onClick={handleCancelAddRoom}>Huỷ bỏ</button>
                    </form>
                </div>
            )}
            <button onClick={handleAddClick}>Thêm phòng mới</button>
        </div>
    );
};

export default ManageRooms;
