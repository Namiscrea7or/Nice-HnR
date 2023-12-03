import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css'

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback", {
          headers: { Authorization: localStorage.getItem('Saved Token') }
        });
        console.log(response.data);

        const { success, posts } = response.data;

        // Kiểm tra xem dữ liệu có phản hồi không
        if (success && posts && posts.length > 0) {
          setFeedbackList(posts);
        }
      } catch (error) {
        console.error("Error fetching data from the server", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section id="feedback-list">
        <h2 className='feedback_h2'>What Our Customers Say</h2>
        {feedbackList.map((feedback, index) => (
          <div key={index} className="feedback-item">
            <p>Description: {feedback.description}</p>
            <p>Rate: {feedback.rate}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Feedback;
