// ManageUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GuestDetails from '../../components/guest detail/GuestDetails';
import ReactPaginate from 'react-paginate';
import './user.css';

const ManageUser = () => {
  const [guests, setGuests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Changed from 1 to 0
  const [itemsPerPage] = useState(2); // Change this value to set the number of items per page

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

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGuests = guests.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteGuest = async (guestId) => {
    try {
      console.log(guestId);
      const res = await axios.delete(`http://localhost:5000/api/user/${guestId}`, {
        headers: {
          Authorization: localStorage.getItem('Saved Token'),
        },
      });

      console.log(localStorage.getItem('Saved Token'));
      console.log(res.data);
    } catch (e) {
      console.log('Wrong details');
    }
  };

  return (
    <div className='ManageUser'>
      <h2>Manage Guests</h2>
      <ul>
        {currentGuests.map((guest) => (
          <li key={guest.email}>
            <GuestDetails guest={guest} onDeleteClick={handleDeleteGuest} />
          </li>
        ))}
      </ul>
      <ReactPaginate
        pageCount={Math.ceil(guests.length / itemsPerPage)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default ManageUser;
