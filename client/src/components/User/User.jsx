import React from 'react'
import './User.css'
const User = (props) => {
    const {
        full_name,
        user_id,
        phone_number,
        address,
        role,
        createAt,
    } = props;
    return (
        <div className='user'>
            <h1 id='employeeInfo'>Employee Information</h1>
            <div className='employee-card'>
                <img src={require (`../user_img/${user_id}.jpg`)} alt="img" />
                <div className='employee-details'>
                    <h2 id='employee-name'>Name: {full_name}</h2>
                    <p id='employee-position'>ID: {user_id}</p>
                    <p id='phone'>Phone: {phone_number}</p>
                    <p className="role">Role: {role}</p>
                    <p className="create">Start at: {createAt}</p>
                </div>
            </div>
        </div>
    )
}

export default User