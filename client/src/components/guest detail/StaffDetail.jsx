// GuestDetails.js
import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from '../../pages/login/RegisterForm';
import { useNavigate } from 'react-router-dom';
import './staff.css'

const StaffDetail = ({ guest, onEditClick, onDeleteClick }) => {
    console.log({ guest })
    const [isEditing, setIsEditing] = useState(false);
    const [editedGuest, setEditedGuest] = useState({ ...guest });

    const handleEditClick = () => {
        setIsEditing(true);
        onEditClick(guest);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = async (guestId) => {
        try {
            const formattedDate = new Date(editedGuest.birthday).toISOString().split('T')[0];

            const res = await axios.put(`http://localhost:5000/api/user/info`, {
                data: {
                    ...editedGuest,
                    birthday: formattedDate
                },
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });

            console.log(localStorage.getItem('Saved Token'))
            console.log(res.data);
        } catch (e) {
            console.log('Wrong details');
        }
        setIsEditing(false);
    };


    const handleDeleteClick = () => {
        onDeleteClick(guest.email);
    };



    const { full_name, email, birthday, address, phone_number } = editedGuest
    const handleInputChange = event => setEditedGuest(prev => ({ ...prev, [event.target.name]: event.target.value }))

    return (
        <div className='StaffDetail'>
            <img src={`https://robohash.org/${guest.full_name}`} alt='photo' />
            <div className='staffInfo'>
                <h3>{guest.full_name}</h3>
                <p>Email: {guest.email}</p>
                <p>Birthday: {guest.birthday}</p>
                <p>Address: {guest.address}</p>
                <p>Phone Number: {guest.phone_number}</p>
            </div>
            {isEditing ? (
                <>
                    <div className='editForm'>
                        <label>
                            Full Name:
                            <input
                                type="text"
                                name="full_name"
                                value={editedGuest.full_name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="text"
                                name="email"
                                value={editedGuest.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={editedGuest.address}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input
                                type="text"
                                name="phone_number"
                                value={editedGuest.phone_number}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Date of birth:
                            <input
                                type="date"
                                name="birthday"
                                value={editedGuest.birthday}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className='handleBtn'>
                        <button className="edit" onClick={handleSaveEdit}>Save</button>
                        <button className="delete" onClick={handleCancelEdit}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='handleBtn'>
                        <button className="edit" onClick={handleEditClick}>Edit</button>
                        <button className="delete" onClick={handleDeleteClick}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StaffDetail;
