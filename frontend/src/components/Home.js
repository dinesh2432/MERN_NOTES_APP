import React from 'react'
import './Home.css'
import {useNavigate} from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
    const handleLogin=(e)=>{
        e.preventDefault()
        navigate('/login')
    }
  return (
    <div className='inner'>
        <div className='inner1'>
            <h1>NOTES</h1>
            <button onClick={handleLogin}>LOGIN</button>
        </div>

        <div className='inner2'>
            <h1>Welcome to Notes App</h1>
            <h4>Use this site to store your blog buddy..</h4>
            <button onClick={handleLogin}>GET STARTED</button>
        </div>
    </div>
  )
}

export default Home