import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import './aboutAndContact.css'
import Navbar from '../../components/navbar/Navbar'

const AboutAndContact = () => {
  const history = useNavigate()
  const [Contact, setContact] = useState({
    message: '',
    stars: 0
  })
  const [error, setError] = useState({})

  const {message, stars} = Contact
  const onChangeContact = event => setContact(prev => ({ ...prev, [event.target.name]: event.target.value }))
  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        message, stars
      },  { headers: { Authorization: localStorage.getItem('Saved Token') } });
      console.log(res.data)
      if (res.data.message === 'User logged in successfully') {
        history('/thankyou');
      } else if (res.data.message === 'Incorrect username or password!') {
        alert('Incorrect username or password!');
      }
    } catch (e) {
      alert('Wrong details');
    }

  }

  const handleStars = (rating) => {
    setContact((prev) => ({ ...prev, stars: rating + 1 }));
  };

  return (
    <div className="about">
      <Navbar/>
      <div className="blank"></div>
      <div className="contact-container">
        <section id="contact-info">
          <h1 className='contact_h1'>Contact Information</h1>
          <address>
            <h2 className='contact_h2'><strong>Nice Hotel and Restaurant</strong></h2>
            <p className='contact_p'>1 Nguyen Van Cu Street</p>
            <p className='contact_p'>District 1, Ho Chi Minh city</p>
            <p className='contact_p'>Phone: (94) 123-456-789</p>
            <p className='contact_p'>Email: nicehotelandrestaurant@gmail.com</p>
            <img className='contact_img' src="./signature.png" alt="" />
          </address>
        </section>
        <section id="contact-form">
          <h1 className='contact_h1'>Get in Touch</h1>
          <form className='contact_form' action="submit.php" method="post">
          <label htmlFor="rating">Rate Your Experience</label>
          <div className="rating">
            {[5, 4, 3, 2, 1].map((rating) => (
              <React.Fragment key={rating}>
                <input
                  className={`star star-${rating}`}
                  id={`star-${rating}`}
                  type="radio"
                  name="star"
                  onChange={() => handleStars(rating)}
                />
                <label className={`star star-${rating}`} htmlFor={`star-${rating}`}></label>
              </React.Fragment>
            ))}
          </div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="3" required></textarea>
            <input type="submit" value="Send" />
          </form>
        </section>
      </div>
    </div>
  )
}

export default AboutAndContact