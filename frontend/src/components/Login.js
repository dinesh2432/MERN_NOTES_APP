import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            return toast.error("Please fill in all fields");
        }

        setIsLoading(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
                { email, password },
                { withCredentials: true, headers: { "Content-Type": "application/json" } }
            );
            
            localStorage.setItem("authToken", res.data.token);
            if (res.status === 200) {
                toast.success("Login successful!");
                navigate('/notes');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePassword = (e) => {
        e.preventDefault();
        navigate('/email-verify');
    };

    return (
        <div className="login-container">
            <h1>LOGIN</h1>
            <form className='login_inner1' onSubmit={handleLogin}>
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
                
                <p onClick={!isLoading ? handlePassword : null} style={{ cursor: isLoading ? 'default' : 'pointer' }}>
                    Forget Password
                </p>
                
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
                            Logging in...
                        </>
                    ) : (
                        "LOGIN"
                    )}
                </button>
            </form>

            <div className="login_inner2">
                <h4>
                    Don't have an account? <span><Link to={!isLoading ? "/signin" : "#"}>Register here</Link></span>
                </h4>
            </div>
        </div>
    );
};

export default Login;