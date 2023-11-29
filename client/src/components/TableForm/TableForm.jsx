import React, { useState, useContext } from 'react'
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'

const TableForm = ({tableList}) => {
    const history = useNavigate()
    const handleKeyPress = (event) => {
        // Hàm kiểm tra xem ký tự có phải là số không
        const isNumberKey = (event) => {
          const charCode = event.which ? event.which : event.keyCode;
          return charCode >= 48 && charCode <= 57;
        };
    
        // Ngăn chặn việc nhập các ký tự không phải số
        if (!isNumberKey(event)) {
          event.preventDefault();
        }
      };
    
      const [tableForm, setTableForm] = useState({
        full_name: '', phone_number: '', check_in: ''
      })

      const [error, setError] = useState({})

      const {full_name, phone_number, check_in} = tableForm

      const onChangeTableForm = event => setTableForm(prev => ({ ...prev, [event.target.name]: event.target.value }))

      async function submit(e) {
        e.preventDefault();
    
        try {
          const res = await axios.post("http://localhost:5000/api/auth/login", {
            tableList, full_name, phone_number, check_in
          });
          console.log(res.data)
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
            <form className='form' onSubmit={submit} action='POST'>
              <label htmlFor="name">Your name</label>
              <input value={full_name} type="text" id="name" placeholder="Full name" name='full_name' onChange={onChangeTableForm}/>
    
              <label htmlFor="phone">Phone Number</label>
              <input
                value={phone_number}
                type="text"
                id="phone"
                placeholder="Phone Number"
                name='phone_number'
                onKeyPress={handleKeyPress}
                onChange={onChangeTableForm}
              />
    
              <label htmlFor="check-in">Check-in Date:</label>
              <input value={check_in} type="date" id="check-in" name="check-in" required onChange={onChangeTableForm}/>
    
              <input type="submit" value="Submit" />
            </form>
          </section>
        </div>
      );
}

export default TableForm