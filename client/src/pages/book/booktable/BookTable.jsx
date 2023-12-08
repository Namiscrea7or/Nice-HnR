import React, { useState, useEffect } from 'react';
import TableForm from '../../../components/TableForm/TableForm';
import TableList from '../../../components/tableList/TableList';

import './BookTable.css'

const BookTable = () => {
  const [selectedTables, setSelectedTables] = useState([]);

  const handleSelectTables = (selectedItems) => {
    setSelectedTables(selectedItems);
  };
  return (
    <div className='tableBookingContainer'>
      <div className='rl'>
        <h1 id='bookingTableHeader'>Đặt bàn ăn tại khách sạn</h1>
        <TableList onSelectTables={handleSelectTables} /></div>
      <div className='rf'><TableForm selectedTables={selectedTables} /></div>
    </div>
  );
};

export default BookTable;
