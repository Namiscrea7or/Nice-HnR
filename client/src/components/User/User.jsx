import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';

const User = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log({ headers: { Authorization: localStorage.getItem('Saved Token') } })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/info', { headers: { Authorization: localStorage.getItem('Saved Token') } });

                console.log(response.data)
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.response?.status, error.response?.data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>Error loading data</div>;
    }

    const {
        full_name,
        user_id,
        phone_number,
        address,
        role,
        createAt,
    } = userData;

    return (
        <div className='user'>
            <h1 id='employeeInfo'>Employee Information</h1>
            <div className='employee-card'>
                <img src={require(`./img/${user_id}.jpg`)} alt="" />
                <div className='employee-details'>
                    <h2 id='employee-name'>Name: {full_name}</h2>
                    <p id='employee-position'>ID: {user_id}</p>
                    <p id='phone'>Phone: {phone_number}</p>
                    <p className="role">Role: {role}</p>
                    <p className="create">Start at: {createAt}</p>
                </div>
            </div>
        </div>
    );
};

export default User;
