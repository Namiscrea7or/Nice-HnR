import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/booking/', { headers: { Authorization: localStorage.getItem('Saved Token') } });

            console.log(response.data);
            const { success, user, detailedRooms, detailedTables, totalRoomPrice, totalTablePrice } = response.data;

            const roomBills = detailedRooms.map(room => ({
              type: 'room',
              roomType: room.roomType,
              roomNumber: room.roomNumber,
              description: room.description,
              price: room.price,
            }));

            const tableBills = detailedTables.map(table => ({
              type: 'table',
              tableType: table.tableType,
              tableNumber: table.tableNumber,
              price: table.price,
            }));

            setBills([...roomBills, ...tableBills]);
            setTotalAmount(totalRoomPrice + totalTablePrice);
        } catch (error) {
            console.error('Error fetching data:', error.response?.status, error.response?.data);
        } finally {
  
        }
    };

    fetchData();
}, []);


  return (
    <div>
      {bills.length === 0 ? (
        <p>Hiện tại không có hoá đơn nào.</p>
      ) : (
        <div>
          <ul>
            {bills.map((bill, index) => (
              <li key={index}>
                <div>
                  {bill.type === 'room' && (
                    <>
                      Room Type: {bill.roomType}, Room Number: {bill.roomNumber}, Description: {bill.description}, Price: {bill.price}
                    </>
                  )}
                  {bill.type === 'table' && (
                    <>
                      Table Type: {bill.tableType}, Table Number: {bill.tableNumber}, Price: {bill.price}
                    </>
                  )}
                  <hr/>
                </div>
              </li>
            ))}
          </ul>
          <p>Total Amount: {totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default Bill;
