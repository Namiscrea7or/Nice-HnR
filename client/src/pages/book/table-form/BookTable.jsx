import React from 'react';
import TableForm from '../../../components/TableForm/TableForm';
import TableList from '../../../components/tableList/TableList';

import './BookTable.css'

const BookTable = () => {
  return (
    <div className='tableBookingContainer'>
      <TableList/>
      <TableForm />
    </div>
  );
};

export default BookTable;
