import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css'

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback"
        );
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

  const renderStars = (rate) => {
    const fullStars = '★'.repeat(rate);
    const emptyStars = '☆'.repeat(5 - rate);
    return fullStars + emptyStars;
  };

  return (
    <div>
      <section id="feedback-list">
        <h2 className='feedback_h2'>What Our Customers Say</h2>
        {feedbackList.map((feedback, index) => (
          <div key={index} className="feedback-item">
            <p>User: {feedback.user.full_name}</p>
            <p>Description: {feedback.description}</p>
            <div className="star">{renderStars(feedback.rate)}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Feedback;
