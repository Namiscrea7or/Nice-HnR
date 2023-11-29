import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bookTable.css'

const BookTable = () => {
    const [tables, setTables] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        // Gửi yêu cầu đến server để lấy danh sách bàn
        const fetchData = async () => {
            try {
                const response = await axios.get('URL_API/tables');
                setTables(response.data); // Cập nhật state với danh sách bàn từ server
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bàn:', error);
            }
        };

        fetchData();
    }, []); // Chạy chỉ một lần khi component được mount

    const handleCheckboxChange = (tableId) => {
        const updatedItems = [...selectedItems];
        const index = updatedItems.indexOf(tableId);

        if (index === -1) {
            updatedItems.push(tableId);
        } else {
            updatedItems.splice(index, 1);
        }

        setSelectedItems(updatedItems);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Gửi dữ liệu đặt bàn (selectedItems) về server
            const response = await axios.post('URL_API/bookings', { selectedItems });
            console.log('Đã gửi dữ liệu đặt bàn thành công:', response.data);
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu đặt bàn:', error);
        }
    };

    const isNumberKey = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        return charCode >= 48 && charCode <= 57;
    };

    // Ngăn chặn việc nhập các ký tự không phải số
    if (!isNumberKey(event)) {
        event.preventDefault();
    }

    return (
        <div className='bookTable'>
            <h1 id='bookingTableHeader'>Đặt bàn ăn tại khách sạn</h1>
            <form onSubmit={handleSubmit} id='tableForm'>
                <div className="tableList">
                    {tables.map((table) => (
                        <label key={table.id}>
                            <input
                                type="checkbox"
                                value={table.id}
                                checked={selectedItems.includes(table.id)}
                                onChange={() => handleCheckboxChange(table.id)}
                            />
                            {`Bàn ${table.number}`}
                        </label>
                    ))}
                </div>
                <div className="tableForm">
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
            </form>
        </div>
    );
};

export default BookTable;
