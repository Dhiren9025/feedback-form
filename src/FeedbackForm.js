import React, { useState } from 'react';
import './FeedbackForm.css';
import image from './assets/image.png'


const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    visitFrequency: '',
    foodQuality: 0,
    serviceQuality: 0,
    overallExperience: 0,
    recommend: '',
    suggestions: '',
    followUp: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedback({
      ...feedback,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(feedback);
    alert('Feedback submitted!');
  };

  return (
    <div className="feedback-form-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <img src={image} alt="Paradise Hotel" className="logo" /> 
          <h1>Paradise Hotel</h1>
          <h2>Hello, Thanks for Visiting!</h2>
          <p>Please help us improve our cafe services by filling in our feedback form.</p>
        </div>

        <label>How Often Do You Visit Here?</label>
        <select name="visitFrequency" value={feedback.visitFrequency} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Regularly">Regularly</option>
          <option value="Occasionally">Occasionally</option>
          <option value="First Time">First Time</option>
        </select>

        <div className="rating">
          <label>Quality of the Food</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                className={feedback.foodQuality >= rating ? 'star selected' : 'star'}
                onClick={() => setFeedback({ ...feedback, foodQuality: rating })}
              >★</span>
            ))}
          </div>

          <label>Service Quality</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                className={feedback.serviceQuality >= rating ? 'star selected' : 'star'}
                onClick={() => setFeedback({ ...feedback, serviceQuality: rating })}
              >★</span>
            ))}
          </div>

          <label>Overall Experience</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                className={feedback.overallExperience >= rating ? 'star selected' : 'star'}
                onClick={() => setFeedback({ ...feedback, overallExperience: rating })}
              >★</span>
            ))}
          </div>
        </div>

        <label>Would you recommend our restaurant to your friends?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="recommend"
              value="Yes"
              checked={feedback.recommend === 'Yes'}
              onChange={handleChange}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="recommend"
              value="No"
              checked={feedback.recommend === 'No'}
              onChange={handleChange}
            /> No
          </label>
        </div>

        <label>Your suggestions to improve</label>
        <textarea
          name="suggestions"
          value={feedback.suggestions}
          onChange={handleChange}
        ></textarea>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="followUp"
              checked={feedback.followUp}
              onChange={handleChange}
            /> Receive personal follow-up to your feedback
          </label>
        </div>

        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
