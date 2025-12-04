import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")

    const [istoggle,setIsToggle]=useState(false)
    const [isMessage,setIsMessage]=useState("")
    const navigate = useNavigate()

    const handleSignin = async(name,email,password)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
        if(!name || !email || !password){
            setIsToggle(true)
            setIsMessage("Data missing!")
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
        if(!passwordRegex.test(password)){
            setIsToggle(true)
            setIsMessage("Password must include uppercase, lowercase, number, and special character.")
            setTimeout(() => {
                setIsToggle(false);
            }, 4000);
            return 
        } 
        try{
            const res = await axios.post(`https://mern-notes-app-86t8.vercel.app/api/auth/register`,{name,email,password},{withCredentials:true,headers:{"Content-Type":"application/json"}})
            if(res.status ==200){
                navigate('/notes')
            }

        }catch(err){
            alert(err.response?.data?.message || err.message)
        }
    }


  return (
    <div className="signin-container">
        <h1>SIGNIN</h1>
        <div className='signin_inner1'>
            <label>NAME</label>
            <input type="text" name="name" required value={name} onChange={(e)=>setName(e.target.value)}/>
            <label>EMAIL</label>
            <input type="text" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label>PASSWORD</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <button onClick={()=>handleSignin(name,email,password)}>LOGIN</button>
        </div>
        <div className="signin_inner2">
            <h4>
                Already have an account? <span><Link to="/login">Login here</Link></span>
            </h4>
        </div>

        {istoggle && (
        <div className="error-message-container">
          <p className="error-message" style={{fontSize:'16px'}}>{isMessage}</p>
        </div>
      )}
    </div>
  )
}

export default Signin