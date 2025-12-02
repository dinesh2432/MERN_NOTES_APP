import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";

const EmailVerify = () => {
    const [email, setEmail] = useState("");
    const [istoggle,setIsToggle]=useState(false)
    const [isMessage,setIsMessage]=useState("")

    const navigate = useNavigate()
    const handleEmailVerify = async(email) =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email){
            setIsToggle(true)
            setIsMessage("Email missing!")
            setTimeout(() => {
                setIsToggle(false);
            }, 4000);
            return
        }
        if(!emailRegex.test(email)){
            setIsToggle(true)
            setIsMessage("Enter valid email")
            setTimeout(() => {
                setIsToggle(false);
            }, 4000);
            return
        } 
        try{
            const res = await axios.post(`https://mern-notes-app-backend-f4h5.onrender.com/api/auth/email-validate`,{email},{withCredentials:true,headers: { "Content-Type": "application/json" }})
            setIsToggle(true)
            setIsMessage(res.data.message)
            setTimeout(() => {
                setIsToggle(false);
            }, 4000);
        }catch(err){
            setIsToggle(true)
            setIsMessage(err.response?.data?.message || "Please enter the data correctly!!")
            setTimeout(() => {
                setIsToggle(false);
            }, 4000);
            // alert(err.response?.data?.message || "Please enter the data correctly!!")
        }
    }
  return (
    <div className="email_verify_inner">
        <div className="email_verify_inner1">
            <h1>VERIFY EMAIL</h1>    
            <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="enter your email.."/>
            <br />
        <button onClick={()=>handleEmailVerify(email)}>SEND OTP</button>
        </div>


        {istoggle && (
            <div className="error-message-container">
            <p className="error-message" style={{fontSize:'16px'}}>{isMessage}</p>
            </div>
        )}
    </div>
  )
}

export default EmailVerify