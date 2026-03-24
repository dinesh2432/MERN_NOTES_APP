import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
        
        if (!name || !email || !password) {
            return toast.error("Please fill in all fields!");
        }
        if (!emailRegex.test(email)) {
            return toast.error("Please enter a valid email address");
        } 
        if (!passwordRegex.test(password)) {
            return toast.error("Password must include uppercase, lowercase, number, and special character.");
        } 
        
        setIsLoading(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
                { name, email, password },
                { withCredentials: true, headers: { "Content-Type": "application/json" } }
            );
            
            localStorage.setItem("authToken", res.data.token);
            if (res.status === 200) {
                toast.success("Account created successfully!");
                navigate('/notes');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <h1>SIGN UP</h1>
            <form className='signin_inner1' onSubmit={handleSignin}>
                <label>NAME</label>
                <input 
                    type="text" 
                    name="name" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    style={{ opacity: isLoading ? 0.6 : 1 }}
                />
                
                <label>EMAIL</label>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    style={{ opacity: isLoading ? 0.6 : 1 }}
                />
                
                <label>PASSWORD</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    disabled={isLoading}
                    style={{ opacity: isLoading ? 0.6 : 1 }}
                />
                
                <button 
                    type="submit"
                    disabled={isLoading}
                    style={{ 
                        opacity: isLoading ? 0.7 : 1, 
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    {isLoading ? (
                        <>
                            <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle className="path" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="31.4 31.4" strokeLinecap="round">
                                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 12 12;360 12 12" />
                                </circle>
                            </svg>
                            Creating Account...
                        </>
                    ) : (
                        "SIGN UP"
                    )}
                </button>
            </form>
            
            <div className="signin_inner2">
                <h4>
                    Already have an account? <span><Link to={!isLoading ? "/login" : "#"}>Login here</Link></span>
                </h4>
            </div>
        </div>
    );
};

export default Signin;