import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import './System_Admin.css'

const System_Admin = () => {
    const history = useNavigate()
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
        success,
        email,
        full_name,
        address,
        birthday,
        user_id,
        role,
        createAt,
    } = userData;

    const handleLogout = () => {
        localStorage.removeItem('Saved Token');
        history('/log');
    };
    return (
        <div className='user'>
            <h1 id='employeeInfo'>User Information</h1>
            <div className='employee-card'>
                {/* <img src={require(`./img/${user_id}.jpg`)} alt="user_image" /> */}
                <div className='employee-details'>
                    <h2 id='employee-name'>Name: {full_name}</h2>
                    <p id='employee-position'>ID: {user_id}</p>
                    <p id="email">Email: {email}</p>
                    <p className="birthday">Date of birth: {birthday}</p>
                    <p className="address">Address: {address}</p>
                    <p className="role">Role: {role}</p>
                    <p className="create">Start at: {createAt}</p>
                </div>
                <button className='logout' onClick={handleLogout}>Log out</button>
            </div>
            <button><Link to='/manage_user'>Guest</Link></button>
            <button><Link to='/manage_staff'>Staff</Link></button>
            <button><Link to='/manage_room'>Rooms</Link></button>
            <button><Link to='/manage_table'>Tables</Link></button>
            <button><Link to='/manage_dish'>Dishes</Link></button>
        </div>
    )
}

export default System_Admin