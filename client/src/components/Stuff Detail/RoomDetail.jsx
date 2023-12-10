import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RoomDetail = ({ room, onEditClick, onDeleteClick }) => {
    const state = 'available'
    if(room.state === 'false') {
        state = 'unavailable'
    }
    const [isEditing, setIsEditing] = useState(false);
    const [editedRoom, setEditedRoom] = useState({ ...room });

    const handleEditClick = () => {
        setIsEditing(true);
        onEditClick(room);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/room/update_room`,
                editedRoom,
                {
                    headers: {
                        Authorization: localStorage.getItem('Saved Token')
                    }
                }
            );
    
            setEditedRoom((prev) => ({ ...prev }));
            console.log(res.data);
        } catch (e) {
            console.error('Error updating room:', e.response?.status, e.response?.data);
        }
    
        setIsEditing(false);
    };


    const handleDeleteClick = () => {
        onDeleteClick(room.room_number);
    };


    const handleInputChange = event => setEditedRoom(prev => ({ ...prev, [event.target.name]: event.target.value }))

    return (
        <div>
            <h3>{room.room_type}</h3>
            <p>Room number: {room.room_number}</p>
            <p>Description: {room.description}</p>
            <p>State: {state}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Price: {room.price}</p>
            <p>Discount: {room.discount}</p>

            {isEditing ? (
                <>
                    {/* Editing form */}
                    <label>
                        State:
                        <input
                            type="text"
                            name="state"
                            value={editedRoom.state}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="text"
                            name="price"
                            value={editedRoom.price}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Discount:
                        <input
                            type="text"
                            name="discount"
                            value={editedRoom.discount}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={handleEditClick}>Edit</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </>
            )}
        </div>
    );
};


export default RoomDetail