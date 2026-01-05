import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import Login from '../../pages/Authentication/Login'
import { useAppContext } from "../../redux/ContextApi";

const Navbar = () => {
  const { islogin, logOut } = useAppContext();
  return (
    <div className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
       {islogin && <>
         <Link to="/service">Service</Link>
        <Link to="/features">Features</Link>
       </>}
      </div>
      <div className="navbar-actions">
         {islogin ? <Link to="/login" onClick={()=>logOut()} className='mkbtn'>Logout</Link> : <Link to="/login" className='mkbtn'>Login</Link>}
        <div>Mode</div>
      </div>
    </div>
  )
}

export default Navbar















// import { useAppContext } from './context';

// const Child = () => {
//     const { user, setUser } = useAppContext();
//     return <div>{user ? `Hello ${user}` : "Not logged in"}</div>;
// }
