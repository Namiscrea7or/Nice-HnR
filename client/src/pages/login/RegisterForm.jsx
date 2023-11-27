import React, { useState } from 'react'
import './LoginForm.css'
import validation from './SignupValidation';
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios';

const RegisterForm = (props) => {
    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState({})

    const { name, email, password } = signupForm

    const onChangeSignupForm = event => setSignupForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validation(signupForm))
    }

    async function submit(e) {
        e.preventDefault();
    
        try {
          await axios.post("http://localhost:5000/signup", {
            name, email, password
          })
        } catch (error) {
          console.log(error)
        }
      }


    return (
        <div className='auth-form'>
            <div className='wrapper'>
                <div className='form-box'>
                    <h2>Register</h2>
                    <form className='form' onSubmit={handleSubmit}>
                        <div class="input-box">
                            <input value={name} type='name' placeholder='Username' id='name' name='name' onChange={onChangeSignupForm} />
                        </div>
                        <div class="input-box">
                            <input value={email} type='email' placeholder='Email' id='email' name='email' onChange={onChangeSignupForm} />
                            {error.email && <span>{error.email}</span>}
                        </div>
                        <div class="input-box">
                            <input value={password} type='password' placeholder='Password' id='password' name='password' onChange={onChangeSignupForm} />
                            {error.password && <span>{error.password}</span>}
                        </div>
                        <button type='submit' className='login-btn'>Register</button>
                    </form>
                    <div className='login-register'>
                        <p>
                            Already have an account?
                            <a onClick={() => props.onFormSwitch('login')}>Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default RegisterForm;