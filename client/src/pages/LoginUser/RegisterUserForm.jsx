import React, { useState } from 'react'
import validation from './SignupValidation'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';


const RegisterUserForm = (props) => {
    const history = useNavigate()
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        full_name: '',
        phone_number: '',
        address: '',
        birthday: '',
        user_id: ''
    });

    const [error, setError] = useState({})

    const { email, password, full_name, phone_number, address, birthday, user_id } = signupForm

    const onChangeSignupForm = event => setSignupForm(prev => ({ ...prev, [event.target.name]: event.target.value }))

    async function submit(e) {
        e.preventDefault();
        const formErrors = validation(signupForm);
        setError(formErrors);
    
        if (Object.keys(formErrors).length > 0) {
            alert('Invalid input. Please check your details.');
            return;
        }
        try {
            const res = await axios.post("https://nice-handr-server1.onrender.com/api/auth/register_guest", {
                email, password, full_name, phone_number, address, birthday, user_id
            });
            console.log(res.data)
            if (res.data.message === 'User created successfully') {
                let token = res.data.accessToken
                localStorage.setItem("Saved Token", 'Bearer ' + token)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                history('/home');
            } else if (res.data.message === 'Incorrect username or password!') {
                alert('Incorrect username or password!');
            }
        } catch (e) {
            alert('Wrong details');
        }

    }

    return (
        <div className='auth-form-register'>
            <div className='wrapper'>
                <div className='form-box'>
                    <h2>Register</h2>
                      <form className='Register_form' onSubmit={submit} action='POST'>
                        <div className="input-box">
                            <input
                                value={email}
                                type='text'
                                placeholder='Email'
                                id='email'
                                name='email'
                                onChange={onChangeSignupForm}
                            />
                            {error.email && <span>{error.email}</span>}
                        </div>
                        <div className="input-box">
                            <input
                                value={password}
                                type='password'
                                placeholder='Password'
                                id='password'
                                name='password'
                                onChange={onChangeSignupForm}
                            />
                            {error.password && <span>{error.password}</span>}
                        </div>
                        <div className="input-box">
                            <input
                                value={full_name}
                                type='text'
                                placeholder='Your Name'
                                id='full_name'
                                name='full_name'
                                onChange={onChangeSignupForm}
                            />
                            {error.full_name && <span>{error.full_name}</span>}
                        </div>
                        <div className="input-box">
                            <input
                                value={phone_number}
                                type="text"
                                placeholder='Phone Number'
                                id='phone_number'
                                name='phone_number'
                                onChange={onChangeSignupForm}
                            />
                            {error.phone_number && <span>{error.phone_number}</span>}
                        </div>
                        <div className="input-box">
                            <input
                                value={address}
                                type='text'
                                placeholder='Address'
                                id='address'
                                name='address'
                                onChange={onChangeSignupForm}
                            />
                            {error.address && <span>{error.address}</span>}
                        </div>
                        <div className="input-box">
                            <input value={birthday} type='date' placeholder='Date of birth' id='birthday' name='birthday' onChange={onChangeSignupForm} />
                        </div>
                        <div className="input-box">
                            <input
                                value={user_id}
                                type="text"
                                placeholder='Your ID'
                                id='user_id'
                                name='user_id'
                                onChange={onChangeSignupForm}
                            />
                            {error.user_id && <span>{error.user_id}</span>}
                        </div>
                        <button type='submit' className='login-btn' disabled={Object.keys(error).length > 0}>
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default RegisterUserForm;