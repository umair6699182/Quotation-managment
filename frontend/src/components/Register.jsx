import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register = ({ onToggle }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // States for message and its type
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate()

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value, // Dynamically set field value based on `id`
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send data to backend using Axios
      const response = await axios.post('http://localhost:8080/register', formData);
      console.log(response);
      if(response){
        localStorage.setItem("data", JSON.stringify(response.data));
        setMessage(`Registration Successful: ${response.data.message}`);
        setMessageType('success'); // Set message type to success
        navigate('/dashboard/maincontent')
      }
  
    } catch (error) {
      // Handle errors from the backend
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
      setMessageType('error'); // Set message type to error
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '24rem' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
          {message && (
            <p
              className="text-center mt-3"
              style={{
                color: messageType === 'success' ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {message}
            </p>
          )}
          <div className="text-center mt-3">
            <Link to={'/'} onClick={onToggle} className="text-decoration-none">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
