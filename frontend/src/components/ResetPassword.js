import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); 
  const [password, setPassword] = useState('');
  const [istoggle,setIsToggle]=useState(false)
  const [isMessage,setIsMessage]=useState("")
  const navigate = useNavigate();

  const handleResetPassword = async (token,password) => {

    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if(!password){
      setIsToggle(true)
      setIsMessage("Enter password")
      setTimeout(() => {
          setIsToggle(false);
      }, 4000);
      return 
    }
    if(!passwordRegex.test(password)){
      setIsToggle(true)
      setIsMessage("Password should contain one capital letter,small letter,special character,and number")
      setTimeout(() => {
          setIsToggle(false);
      }, 4000);
      return 
    } 
    try {
      const res = await axios.post(
        `https://mern-notes-app-backend-f4h5.onrender.com/api/auth/reset-password`,
        { token, password },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      setIsToggle(true)
      setIsMessage(res.data.message)
      setTimeout(() => {
          setIsToggle(false);
      }, 4000);
      navigate('/login'); 
    } catch (err) {
      setIsToggle(true)
      setIsMessage(err.response?.data?.message || 'Something went wrong!')
      setTimeout(() => {
          setIsToggle(false);
      }, 4000);
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
        <button onClick={()=>handleResetPassword(token,password)}>Reset Password</button>
      </div>


      {istoggle && (
        <div className="error-message-container">
          <p className="error-message" style={{fontSize:'16px'}}>{isMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
