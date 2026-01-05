import React from 'react'
import { useState } from 'react'

const ForgetPassword = () => {
  const [regiterForm, setRegisterForm] = useState({
    email: "",
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

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(regiterForm);
}

  return (

    <div className="login-container">
  <div className="login-box">
    <div>
      <h1>Forgetpassword Page</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="useremail">Email</label>
          <input type="email" id="useremail" name="email" required value={regiterForm.email} onChange={handleChange}/><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>

    
  )
}

export default ForgetPassword