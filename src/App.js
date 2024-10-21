import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
          <div className='navbar'>
          
            <li><Link to="/">Feedback Form</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            </div>
            
          </ul>
        </nav>

        <Routes>
        
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
