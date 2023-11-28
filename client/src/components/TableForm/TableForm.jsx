import React from 'react'

const TableForm = () => {
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
    
      return (
        <div>    
          <section id="booking-form">
            <h2>Please fill out the booking form below</h2>
            <form method="GET">
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" placeholder="Full name" />
    
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                onKeyPress={handleKeyPress}
              />
    
              <label htmlFor="check-in">Check-in Date:</label>
              <input type="date" id="check-in" name="check-in" required />
    
              <input type="submit" value="See available tables" />
            </form>
          </section>
        </div>
      );
}

export default TableForm