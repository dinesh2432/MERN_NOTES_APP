import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate()
    const handleLogin = async(email,password)=>{
        try{
            const res = await axios.post(`https://mern-notes-app-backend-f4h5.onrender.com/api/auth/login`,{email,password},{withCredentials:true,headers:{"Content-Type":"application/json"}})
            if(res.status ==200){
                navigate('/notes')
            }

        }catch(err){
            alert(err.response?.data?.message || err.message)
        }
    }
    const handlePassword = (e) =>{
        e.preventDefault()
        navigate('/email-verify')
    }

    
  return (
    <div className="login-container">
        <h1>LOGIN</h1>
        <div className='login_inner1'>
            <label>EMAIL</label>
            <input type="text" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label>PASSWORD</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <p onClick={handlePassword}>Forget Password</p>
            <button onClick={()=>handleLogin(email,password)}>LOGIN</button>
        </div>

        <div className="login_inner2">
            <h4>
                Don't have an account? <span><Link to="/signin">Register here</Link></span>
            </h4>
        </div>
    </div>

  )
}

export default Login