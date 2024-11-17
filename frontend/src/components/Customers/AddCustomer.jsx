import React, { useState } from "react";
import axios from "axios";

const AddCustomer = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // State for handling success or error messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

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
      const response = await axios.post("http://localhost:8080/addcustomer", formData);
      setMessage(`Customer Added Successfully!`);
      setMessageType("success");
      setFormData({ name: "", email: "", phone: "", address: "" }); // Reset form
    } catch (error) {
      // Handle errors from the backend
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
      setMessageType("error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "35rem", borderRadius: "12px", backgroundColor: "#f9f9f9" }}>
        <h2 className="text-center mb-4 text-primary">Add New Customer</h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="name"
              placeholder="Enter customer name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control rounded-pill"
              id="email"
              placeholder="Enter customer email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Input */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="phone"
              placeholder="Enter customer phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address Input */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              className="form-control rounded-3"
              id="address"
              placeholder="Enter customer address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 rounded-pill py-2">
            Add Customer
          </button>

          {/* Message Display */}
          {message && (
            <p
              className="text-center mt-3"
              style={{
                color: messageType === "success" ? "green" : "red",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                opacity: message ? 1 : 0,
              }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
