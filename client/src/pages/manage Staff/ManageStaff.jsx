import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffDetail from '../../components/guest detail/StaffDetail';
import { useNavigate } from 'react-router-dom';

const ManageStaff = () => {
    const history = useNavigate();
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

    useEffect(() => {
        // This useEffect will trigger when guests state changes
        // You can put additional logic here if needed
    }, [guests]);

    const handleDeleteGuest = async (guestId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/user/${guestId}`, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });

            console.log(localStorage.getItem('Saved Token'));
            console.log(res.data);

            // Update the state by removing the deleted guest
            setGuests((prevGuests) => prevGuests.filter(guest => guest.email !== guestId.email));

        } catch (e) {
            console.error('Error deleting guest:', e.response?.status, e.response?.data);
        }
    };

    const handleEditClick = async (guest) => {
        setEditGuest({ ...guest });
    };

    const handleAddClick = () => {
        history('/register_staff');
    };

    return (
        <div>
            <h2>Manage Guests</h2>
            <ul>
                {guests.map((guest) => (
                    <li key={guest.email}>
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
