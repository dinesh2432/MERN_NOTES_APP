import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ name }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      alert(err.message); 
    }
  };

  return (
    <div className='notesheader'>
      <div className='notesheader1'>
        <h1>Welcome <span style={{ textTransform: 'uppercase', color: 'orange' }}>{name}</span></h1>
        <button onClick={handleLogout}>LOGOUT</button> 
      </div>
      
    </div>
  );
};

export default Header;
