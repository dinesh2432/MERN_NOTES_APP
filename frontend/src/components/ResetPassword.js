import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (token, password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    
    if (!password) {
      return toast.error("Enter password");
    }
    if (!passwordRegex.test(password)) {
      return toast.error("Password should contain one capital letter, small letter, special character, and number");
    } 
    
    const loadingToastId = toast.loading("Resetting password...");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`,
        { token, password },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      toast.success(res.data.message || "Password successfully reset!", { id: loadingToastId });
      navigate('/login'); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong!', { id: loadingToastId });
    }
  };

  return (
    <div className='reset_password'>
      <div className='reset_password1'>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleResetPassword(token, password)}>Reset Password</button>
      </div>
    </div>
  );
};

export default ResetPassword;
