import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";
import { useAppContext } from "../../contextApi/contextapi";

const Login = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const [regiterForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...regiterForm,
      [name]: value,
    });
  };

  const BASEURL = import.meta.env.VITE_SERVER_URL;

  const response = async () => {
    try {
      const res = await fetch(`${BASEURL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regiterForm),
      });

      const data = await res.json();
      console.log("login response Data", data);

      if (!res.ok || !data.success) {
        toast.error("Login failed");
        return;
      }

      if (data.success) {
        // ✅ SINGLE SOURCE OF TRUTH
        login(data.token, data.user);
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.error("login error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    response();
  };

  return (

    <div className="login-container">
      <div className="login-box">
        <div>
          <h1>Login Page</h1>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={regiterForm.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={regiterForm.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit</button>
          </form>

          <p>
            user <Link to="/register" className="ridirect-link">Register</Link>
            or forget password <Link to="/forgetpassword" className="ridirect-link">forget password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;