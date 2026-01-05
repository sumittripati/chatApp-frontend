import React from 'react'
import { useState } from 'react'

const ResetPassword = () => {
  const [regiterForm, setRegisterForm] = useState({
    newpassword: "",
    confirmpassword: "",
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
      <h1>Login Page</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newpassword">New Password</label>
          <input type="password" id="newpassword" name="newpassword" required value={regiterForm.newpassword} onChange={handleChange}/><br />
          
          <label htmlFor="confirmuserpassword">Confirm New Password</label>
          <input type="password" id="confirmuserpassword" name="confirmpassword" required value={regiterForm.confirmpassword} onChange={handleChange}/><br />
          <button type="submit">Submit</button>
        </form>
      </div>
      
    </div>
  </div>
</div>

   
  )
}

export default ResetPassword
