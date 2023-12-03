import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const TableForm = ({ selectedTables }) => {
  const history = useNavigate();
  const handleKeyPress = (event) => {
    const isNumberKey = (event) => {
      const charCode = event.which ? event.which : event.keyCode;
      return charCode >= 48 && charCode <= 57;
    };

    if (!isNumberKey(event)) {
      event.preventDefault();
    }
  };

  const [tableForm, setTableForm] = useState({
    full_name: '',
    phone_number: '',
  });

  const [checkInDate, setCheckInDate] = useState('');

  const onChangeTableForm = (event) => {
    const { name, value } = event.target;
    setTableForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'check_in') {
      setCheckInDate(value);
    }
  };

  async function submit(e) {
    e.preventDefault();

    try {
      console.log({
        selectedTables,
        full_name: tableForm.full_name,
        phone_number: tableForm.phone_number,
        check_in: new Date(checkInDate),
      })
      const res = await axios.post(
        'http://localhost:5000/api/booking/book_table',
        {
          selectedTables,
          full_name: tableForm.full_name,
          phone_number: tableForm.phone_number,
          check_in: new Date(checkInDate), // Convert the date string to a Date object
        },
        {
          headers: { Authorization: localStorage.getItem('Saved Token') },
        }
      );
      console.log(res.data);
      if (res.data.message === 'User logged in successfully') {
        history('/thankyou');
      } else if (res.data.message === 'Incorrect username or password!') {
        alert('Incorrect username or password!');
      }
    } catch (e) {
      alert('Wrong details');
    }
  }

  return (
    <div>
      <section id="booking-form">
        <h2>Please fill out the booking form below</h2>
        <form className="form" onSubmit={submit} action="POST">
          <label htmlFor="name">Your name</label>
          <input
            value={tableForm.full_name}
            type="text"
            id="name"
            placeholder="Full name"
            name="full_name"
            onChange={onChangeTableForm}
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            value={tableForm.phone_number}
            type="text"
            id="phone"
            placeholder="Phone Number"
            name="phone_number"
            onKeyPress={handleKeyPress}
            onChange={onChangeTableForm}
          />

          <label htmlFor="check-in">Check-in Date:</label>
          <input
            value={checkInDate}
            type="date"
            id="check-in"
            name="check_in"
            required
            onChange={onChangeTableForm}
          />

          <input type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
};

export default TableForm;
