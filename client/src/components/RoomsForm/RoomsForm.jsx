import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import './RoomsForm.css'

const RoomsForm = ({ selectedRooms }) => {
    console.log(selectedRooms)
    const {
        room_type,
        room_number,
        description,
        state,
        capacity,
        price,
        discount
    } = selectedRooms
    const history = useNavigate()
    const [roomForm, setRoomForm] = useState({
        numOfAdults: 0,
        numOfChilren: 0
    })
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [error, setError] = useState({})

    const { numOfAdults, numOfChilren } = roomForm

    const onChangeRoomForm = (event) => {
        const { name, value } = event.target;
        setRoomForm((prev) => ({ ...prev, [name]: value }));

        if (name === 'check-in') {
            setCheckin(value);
        }

        if (name === 'check-out') {
            setCheckout(value);
        }

    };
    function increment(field, event) {
        event.preventDefault();
        setRoomForm((prev) => ({ ...prev, [field]: prev[field] + 1 }));
    }
    
    function decrement(field, event) {
        event.preventDefault();
        setRoomForm((prev) => ({ ...prev, [field]: Math.max(0, prev[field] - 1) }));
    }


    async function handleSubmit(event) {
        event.preventDefault();
        try {
            console.log(room_number, checkin, checkout, numOfAdults, numOfChilren)
            const res = await axios.post("http://localhost:5000/api/booking/book_room", {
                room_number, checkin, checkout, numOfAdults, numOfChilren
            }, { headers: { Authorization: localStorage.getItem('Saved Token') } })
            console.log(res.data)
            const{success, message} = res.data
            if (res.data.message === 'Room booked successfully.') {
                history('/thankyou');
            } else {
                alert('Incorrect');
            }
        } catch (e) {
            alert('Wrong details');
        }
    }
    return (
        <div className='bookRoom'>
            <section id='booking-form'>
                <h2>Please fill out the booking form below</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <label htmlFor="check-in">Check-in Date:</label>
                    <input value={checkin} type="date" id="check-in" name="check-in" required onChange={onChangeRoomForm} />

                    <label htmlFor="check-out">Check-out Date:</label>
                    <input value={checkout} type="date" id="check-out" name="check-out" required onChange={onChangeRoomForm} />

                    <label htmlFor="adults">Number of adults:</label>
                    <div className="number-input">
                        <button onClick={(e) => decrement('numOfAdults', e)}>-</button>
                        <input value={numOfAdults} type="text" id="adults" name="adults" readOnly />
                        <button onClick={(e) => increment('numOfAdults', e)}>+</button>
                    </div>

                    <label htmlFor="children">Number of children:</label>
                    <div className="number-input">
                        <button onClick={(e) => decrement('numOfChilren', e)}>-</button>
                        <input value={numOfChilren} type="text" id="children" name="children" readOnly />
                        <button onClick={(e) => increment('numOfChilren', e)}>+</button>
                    </div>


                    <input type="submit" value="Book now" />
                </form>
            </section>
        </div>
    )
}

export default RoomsForm