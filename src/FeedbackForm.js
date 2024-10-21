import React, { useState, useEffect } from 'react'; 
import './FeedbackForm.css';

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

  const [error, setError] = useState('');

  // Clear local storage after the first refresh
  useEffect(() => {
    const firstLoad = localStorage.getItem('firstLoad');

    if (!firstLoad) {
      localStorage.clear(); // Clear local storage
      localStorage.setItem('firstLoad', 'true'); // Set flag for first load
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedback({
      ...feedback,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const existingData = localStorage.getItem('feedbackData');
      let updatedFeedback;
  
      console.log("Existing Data from localStorage:", existingData); // Log existing data
  
      // Check if existingData is null
      if (existingData) {
        try {
          updatedFeedback = [...JSON.parse(existingData), feedback];
        } catch (error) {
          console.error("Error parsing JSON from localStorage:", error);
          alert("There was an error saving your feedback. Please try again.");
          return;
        }
      } else {
        updatedFeedback = [feedback]; // No existing data
      }
  
      localStorage.setItem('feedbackData', JSON.stringify(updatedFeedback));
      console.log(feedback);
      alert('Feedback submitted!');
      
      // Clear the form after submission
      setFeedback({
        visitFrequency: '',
        foodQuality: 0,
        serviceQuality: 0,
        overallExperience: 0,
        recommend: '',
        suggestions: '',
        followUp: false,
      });
      window.location.href = '/dashboard';
    }
  };
  
  const validateForm = () => {
    if (!feedback.visitFrequency || !feedback.recommend || !feedback.suggestions) {
      setError('Please fill out all required fields.');
      console.error('Validation Error: Missing required fields.');
      return false;
    }
    setError(''); // Clear error if validation passes
    return true;
  };

  return (
    <div className="feedback-form-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <h1>Paradise Hotel</h1>
          <h2>Thanks for Visiting!</h2>
          <p>Please help us improve by filling out our feedback form.</p>
        </div>

        {error && <p className="error">{error}</p>}

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
              >
                ★
              </span>
            ))}
          </div>

          <label>Service Quality</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                className={feedback.serviceQuality >= rating ? 'star selected' : 'star'}
                onClick={() => setFeedback({ ...feedback, serviceQuality: rating })}
              >
                ★
              </span>
            ))}
          </div>

          <label>Overall Experience</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                className={feedback.overallExperience >= rating ? 'star selected' : 'star'}
                onClick={() => setFeedback({ ...feedback, overallExperience: rating })}
              >
                ★
              </span>
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
            /> Receive personal follow-up
          </label>
        </div>

        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
