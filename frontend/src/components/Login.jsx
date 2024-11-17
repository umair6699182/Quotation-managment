import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // You can also use fetch if preferred

const Login = ({ onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [succes , setSucces] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to login
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      console.log(response);
      if (response.data) {
        localStorage.setItem("data", JSON.stringify(response.data));
        localStorage.setItem("name", JSON.stringify(response.data.User.name));
        setSucces('Login Success')
        setTimeout(()=>{
          navigate("/dashboard/maincontent");
        },2000)
      
      }else{
        setError('Somethin Wrong' )
      }

      // Store the token (for example, in localStorage or context)
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "25rem" }}>
        <h2 className="text-center mb-4">Quotation Management System</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {succes && <div className="alert alert-success">{succes}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div className="text-center mt-3">
            <Link
              to={"/register"}
              onClick={onToggle}
              className="text-decoration-none"
            >
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
