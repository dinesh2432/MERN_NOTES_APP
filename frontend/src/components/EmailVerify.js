import React, { useState } from "react";
import toast from 'react-hot-toast';
import "./Home.css";
import axios from "axios";

const EmailVerify = () => {
    const [email, setEmail] = useState("");


    const handleEmailVerify = async (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            return toast.error("Email missing!");
        }
        if (!emailRegex.test(email)) {
            return toast.error("Enter valid email");
        } 
        
        const loadingToastId = toast.loading("Sending OTP...");
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/email-verify`,
                { email },
                { withCredentials: true, headers: { "Content-Type": "application/json" } }
            );
            toast.success(res.data.message || "OTP Sent!", { id: loadingToastId });
        } catch (err) {
            toast.error(err.response?.data?.message || "Please enter the data correctly!!", { id: loadingToastId });
        }
    }

    return (
        <div className="email_verify_inner">
            <div className="email_verify_inner1">
                <h1>VERIFY EMAIL</h1>    
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="enter your email.."
                />
                <br />
                <button onClick={() => handleEmailVerify(email)}>SEND OTP</button>
            </div>
        </div>
    );
}

export default EmailVerify;