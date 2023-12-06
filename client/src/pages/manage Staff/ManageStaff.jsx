// ManageUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffDetail from '../../components/guest detail/StaffDetail';
import { useNavigate } from 'react-router-dom';

const ManageStaff = () => {
    const history = useNavigate()
    const [guests, setGuests] = useState([]);
    const [newGuest, setNewGuest] = useState({
        email: '',
        full_name: '',
        birthday: new Date(),
        address: '',
        phone_number: '',
    });
    const [editGuest, setEditGuest] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/get_staff_list', {
                    headers: { Authorization: localStorage.getItem('Saved Token') },
                });
                const { success, guestList } = response.data;
                setGuests(guestList);
            } catch (error) {
                console.error('Error fetching guests:', error.response?.status, error.response?.data);
            }
        };

        fetchData();
    }, []);


    const handleEditGuest = async () => {
        // ... (unchanged)
    };

    const handleDeleteGuest = async (guestId) => {
        try {
            console.log(guestId.email)
            const res = await axios.delete(`http://localhost:5000/api/user/${guestId.email}`, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });

            console.log(localStorage.getItem('Saved Token'))
            console.log(res.data)

        } catch (e) {
            console.log('Wrong details');
        }
    };

    const handleEditClick = async (guest) => {
        setEditGuest({ ...guest });
    };

    const handleAddClick = () => {
        history('/register_staff')
    };

    return (
        <div>
            <h2>Manage Guests</h2>
            <ul>
                {guests.map((guest) => (
                    <li key={guest}>
                        <StaffDetail
                            guest={guest}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteGuest}
                        />
                    </li>
                ))}
            </ul>
            <button onClick={handleAddClick}>Add new staff</button>
        </div>
    );
};

export default ManageStaff;
