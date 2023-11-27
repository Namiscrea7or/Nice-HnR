import React from 'react'
import { useState } from 'react'
import User from '../../components/User/User';
import Task from '../../components/task/Task';
import './staff.css'

const Staff = () => {
  const userData = {
    full_name: 'John Doe',
    user_id: '21127365',
    phone_number: '123-456-7890',
    address: '123 Main St',
    role: 'Employee',
    createAt: '2023-01-01',
  };
  return (
    <div className='Staff'>
      <User{...userData}/>
      <Task{...userData.user_id} />
    </div>
  )
}

export default Staff