import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const LogInModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
   
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    

    // Replace this with your API submission logic
    console.log('Form data submitted:', formData);

    alert('Signed up successfully!');

   
    onClose();

    // Redirecting to dashboard
    navigate('/dashboard');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Log In</h2>

        <form onSubmit={handleSubmit} className="modal-form">
         
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

        

          

          <button type="submit" className="submit-btn">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LogInModal;