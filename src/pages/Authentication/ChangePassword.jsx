import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from "react-router";
 import { toast } from 'react-toastify';

const ChangePassword = () => {

  const navigate = useNavigate();
  const [regiterForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const username = e.target.name;
    const uservalue = e.target.value;
    setRegisterForm({
      ...regiterForm,
      [username]: uservalue,
    });
    console.log(regiterForm);
  }

  const BASEURL = import.meta.env.VITE_SERVER_URL;
  const response = async()=>{
     try {
        const res = await fetch(`${BASEURL}/api/auth/register`,{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(regiterForm)
       })
       const data = await res.json();
       if(!res.ok || !data.success){
          toast.error(data.message || "Registration failed during registration");
       }

       toast.success("Registration successful");
       navigate("/login");
       console.log(data);
     } catch (error) {
        console.error("register error",error);
        toast.error("Registration failed internal error");
        return;
     }
  }

const handleSubmit = (e) => {
    e.preventDefault();
    response();
    console.log(regiterForm);
    navigate("/login");
}


  return (
    <div>
      <h1>Register Page</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Name</label>
          <input type="text" id="username" name="name" required value={regiterForm.name} onChange={handleChange}/><br />

          <label htmlFor="useremail">Email</label>
          <input type="email" id="useremail" name="email" required value={regiterForm.email} onChange={handleChange}/><br />

          <label htmlFor="userpassword">Password</label>
          <input type="password" id="userpassword" name="password" required value={regiterForm.password} onChange={handleChange}/><br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <p>if you are allready registered then you can <Link to="/login">Login</Link></p>
    </div>
  )
}

export default ChangePassword