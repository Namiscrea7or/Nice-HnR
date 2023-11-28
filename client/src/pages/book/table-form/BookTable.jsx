import React from 'react';
import TableForm from '../../../components/TableForm/TableForm';
import Tables from '../../../components/Tables/Tables';
import './BookTable.css'

const BookTable = () => {
  return (
    <div className='tableBookingContainer'>
      <Tables/>
      <TableForm />
    </div>
  );
};

export default BookTable;
