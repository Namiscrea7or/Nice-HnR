import React from 'react'
import './RoomsForm.css'

const RoomsForm = () => {
    function increment(id, event) {
        event.preventDefault();
        let input = document.getElementById(id);
        input.value = parseInt(input.value) + 1;
    }

    function decrement(id, event) {
        event.preventDefault();
        let input = document.getElementById(id);
        if (parseInt(input.value) > 0) {
            input.value = parseInt(input.value) - 1;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Xử lý logic gửi form tại đây
    }
    return (
        <div className='bookRoom'>
            <section id='booking-form'>
                <h2>Please fill out the booking form below</h2>
                <form onSubmit={handleSubmit} action="available-room.html" method="GET">
                    <label htmlFor="check-in">Check-in Date:</label>
                    <input type="date" id="check-in" name="check-in" required />

                    <label htmlFor="check-out">Check-out Date:</label>
                    <input type="date" id="check-out" name="check-out" required />

                    <label htmlFor="adults">Number of adults:</label>
                    <div className="number-input">
                        <button onClick={(e) => decrement('adults', e)}>-</button>
                        <input type="text" id="adults" name="adults" value="1" readOnly />
                        <button onClick={(e) => increment('adults', e)}>+</button>
                    </div>

                    <label htmlFor="children">Number of children:</label>
                    <div className="number-input">
                        <button onClick={(e) => decrement('children', e)}>-</button>
                        <input type="text" id="children" name="children" value="0" readOnly />
                        <button onClick={(e) => increment('children', e)}>+</button>
                    </div>

                    <input type="submit" value="Book now" />
                </form>
            </section>
        </div>
    )
}

export default RoomsForm