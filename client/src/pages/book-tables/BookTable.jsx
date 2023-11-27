import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bookTable.css'

const BookTable = () => {
    const [tables, setTables] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    //   useEffect(() => {
    //     // Gửi yêu cầu đến server để lấy danh sách bàn
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get('URL_API/tables');
    //         setTables(response.data); // Cập nhật state với danh sách bàn từ server
    //       } catch (error) {
    //         console.error('Lỗi khi lấy danh sách bàn:', error);
    //       }
    //     };

    //     fetchData();
    //   }, []); // Chạy chỉ một lần khi component được mount

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

    return (
        <div className='bookTable'>
            <h1 id='bookingTableHeader'>Đặt bàn ăn tại khách sạn</h1>
            <form onSubmit={handleSubmit} id='tableForm'>
                {/* {tables.map((table) => (
          <label key={table.id}>
            <input
              type="checkbox"
              value={table.id}
              checked={selectedItems.includes(table.id)}
              onChange={() => handleCheckboxChange(table.id)}
            />
            {`Bàn ${table.number}`}
          </label>
        ))} */}
                <label>
                    Table 1
                    <input
                        type="checkbox"
                        value="tb1"
                        checked={selectedItems.includes("tb1")}
                        onChange={() => handleCheckboxChange("tb1")}
                    />
                </label>

                <label>
                    Table 2
                    <input
                        type="checkbox"
                        value="tb2"
                        checked={selectedItems.includes("tb2")}
                        onChange={() => handleCheckboxChange("tb2")}
                    />
                </label>

                <label>
                    Table 3
                    <input
                        type="checkbox"
                        value="tb3"
                        checked={selectedItems.includes("tb3")}
                        onChange={() => handleCheckboxChange("tb3")}
                    />
                </label>

                <button type="submit" id='bookingTableBtn'>Đặt bàn</button>
            </form>
        </div>
    );
};

export default BookTable;
