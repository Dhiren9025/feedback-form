import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import your CSS file for styling

const Dashboard = () => {
  const [submittedFeedback, setSubmittedFeedback] = useState([]);

  useEffect(() => {
    // Fetch feedback data from local storage
    const data = localStorage.getItem('feedbackData');
    console.log('Fetched data from localStorage:', data); // Debugging line
    if (data) {
      setSubmittedFeedback(JSON.parse(data));
    }
  }, []);

  const clearFeedback = () => {
    localStorage.removeItem('feedbackData'); // Clear the feedback data from local storage
    setSubmittedFeedback([]); // Update state to reflect that feedback is cleared
    alert('Feedback data cleared!'); // Optional: Show a notification
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Feedback Dashboard</h1>
      <button onClick={clearFeedback} className="clear-feedback-button">Clear Feedback</button>
      {submittedFeedback.length > 0 ? (
        <div className="feedback-grid">
          {submittedFeedback.slice(0, 10).map((feedback, index) => (
            <div key={index} className="feedback-card">
              <h2 className="feedback-heading">Feedback {index + 1}</h2>
              <p><strong>Visit Frequency:</strong> {feedback.visitFrequency}</p>
              <p><strong>Food Quality:</strong> {feedback.foodQuality} ★</p>
              <p><strong>Service Quality:</strong> {feedback.serviceQuality} ★</p>
              <p><strong>Overall Experience:</strong> {feedback.overallExperience} ★</p>
              <p><strong>Recommend:</strong> {feedback.recommend}</p>
              <p><strong>Suggestions:</strong> {feedback.suggestions}</p>
              <p><strong>Follow-up:</strong> {feedback.followUp ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2 className='fill'>No Feedback Submitted Yet</h2>
          <p className='fill'>Please fill out the feedback form to see your feedback here.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
