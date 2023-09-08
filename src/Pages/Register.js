import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; 
import { setDoc, doc, getDoc } from "firebase/firestore";
import {db} from '../firebase';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password != confirmPassword || password.length < 8) return;
    
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return;

    setDoc(doc(db, "users", username), {
      username: username,
      password: password,
      locked: 0
    }); 

    setDoc(doc(db, "picks", username), {
      club: "",
      points: "",
      wins: "",
      losses: "",
      ties: ""
    }); 

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    navigate('/Home');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="login-link">Already have an account? <Link to="/Login">Login</Link></p>
    </div>
  );
};

export default Register;
