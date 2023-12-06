// ManageUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GuestDetails from '../../components/guest detail/GuestDetails';

const ManageUser = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/get_guest_list', {
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



  const handleDeleteGuest = async (guestId) => {
    try {
      console.log(guestId)
      const res = await axios.delete(`http://localhost:5000/api/user/${guestId}`, {
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

  return (
    <div>
      <h2>Manage Guests</h2>
      <ul>
        {guests.map((guest) => (
          <li key={guest.email}>
            <GuestDetails
              guest={guest}
              onDeleteClick={handleDeleteGuest}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUser;
