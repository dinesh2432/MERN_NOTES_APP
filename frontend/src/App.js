import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import EmailVerify from './components/EmailVerify';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <div>
      <Link to="/"></Link>
      <Link to="/login"></Link>
      <Link to="/signin"></Link>
      <Link to="/notes"></Link>
      <Link to="/email-verify"></Link>
      <Link to="/reset-password/:id"></Link>



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/notes" element={<Dashboard />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        
      </Routes>


    </div>
  );
}

export default App;
