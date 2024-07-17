import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/all_done_logo_2.png';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      navigate('/tasks');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Log in</h1>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Log in</button>
        </form>

        {/* commented out the below code as it will not be implemented for MVP */}
        
        {/* <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
        <p>
          By continuing with Google, Apple, or Email, you agree to our
          <a href="/terms-of-service"> Terms of Service</a> and
          <a href="/privacy-policy"> Privacy Policy</a>.
        </p>
        <p className="sign-up">
          Don't have an account? <a href="/sign-up">Sign up</a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
