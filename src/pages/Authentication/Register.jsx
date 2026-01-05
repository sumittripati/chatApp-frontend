// import React from 'react'
// import { useState } from 'react'
// import { useNavigate, Link } from "react-router";
// import { toast } from 'react-toastify';
// import "./login.css";

// const Register = () => {

//   const navigate = useNavigate();
//   const [regiterForm, setRegisterForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const username = e.target.name;
//     const uservalue = e.target.value;
//     setRegisterForm({
//       ...regiterForm,
//       [username]: uservalue,
//     });
//     console.log(regiterForm);
//   }

// //   const BASEURL = import.meta.env.VITE_SERVER_URL;
// //   const response = async()=>{
// //      try {
// //         const res = await fetch(`${BASEURL}/api/auth/register`,{
// //         method: "POST",
// //         headers:{
// //           "Content-Type":"application/json"
// //         },
// //         body:JSON.stringify(regiterForm)
// //        })
// //        const data = await res.json();
// //        if(!res.ok || !data.success){
// //           toast.error(data.message || "Registration failed during registration");
// //        }

// //        toast.success("Registration successful");
// //        navigate("/login");
// //        console.log(data);
// //      } catch (error) {
// //         console.error("register error",error);
// //         toast.error("Registration failed internal error");
// //         return;
// //      }
// //   }

// const handleSubmit = async (e) => {
//     e.preventDefault();
//    await response();
//     console.log(regiterForm);
//     // navigate("/login");
// }

// const BASEURL = import.meta.env.VITE_SERVER_URL;
// const response = async () => {
//   try {
//     const res = await fetch(`${BASEURL}/api/apiregister`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         },
//       body: JSON.stringify(regiterForm),  
//     });
//     const data = await res.json();
//     console.log("response of register",data);
//     if (!res.ok || !data.success) {
//         toast.error(data.message || "Registration failed");
//         return;
//     }
//     toast.success("Registration successful");
//     navigate("/login");
//     console.log(data);
//   } catch (error) {
//      console.error("register error", error);
//     toast.error("Registration failed internal error");
//     return;
//   }
// }


//   return (

//     <div className="login-container">
//   <div className="login-box">
//        <div>
//       <h1>Register Page</h1>

//       <div>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="username">Name</label>
//           <input type="text" id="username" name="name" required value={regiterForm.name} onChange={handleChange}/><br />

//           <label htmlFor="useremail">Email</label>
//           <input type="email" id="useremail" name="email" required value={regiterForm.email} onChange={handleChange}/><br />

//           <label htmlFor="userpassword">Password</label>
//           <input type="password" id="userpassword" name="password" required value={regiterForm.password} onChange={handleChange}/><br />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//       <p>if you are allready registered then you can <Link to="/login">Login</Link></p>
//     </div>
//   </div>
// </div>


//   )
// }

// export default Register










import React, { useState } from 'react'
import { useNavigate, Link } from "react-router";
import { toast } from 'react-toastify';
import "./login.css";

const Register = () => {

  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    image: null
  });

  const BASEURL = import.meta.env.VITE_SERVER_URL;

  // const handleChange = (e) => {
  //   setRegisterForm({
  //     ...registerForm,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    setRegisterForm({
      ...registerForm,
      image: files[0], // 👈 file object
    });
  } else {
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  }
};


//   const handleSubmit = async (e) => {
//     console.log("function running1")
//     e.preventDefault();
//  console.log("function running2")
//     try {
//       console.log("BASEURL:", BASEURL);
//       console.log("registerForm:", registerForm);

//       const res = await fetch(`${BASEURL}/api/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(registerForm),
//       });

//       console.log("function running3")

//       const data = await res.json();
//       console.log("response of register", data.otpToken);

//       if (!res.ok || !data.success) {
//         toast.error(data.message || "Registration failed");
//         return;
//       }

//       if(data.success){
//         localStorage.setItem("otpToken", data.otpToken);
//       }

//       toast.success("Registration successful");
//       navigate("/otpveriefy");

//     } catch (error) {
//       console.error("register error", error);
//       toast.error("Internal server error");
//     }
//   };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("name", registerForm.name);
    formData.append("email", registerForm.email);
    formData.append("password", registerForm.password);

    // 👇 optional image
    if (registerForm.image) {
      formData.append("image", registerForm.image);
    }

    const res = await fetch(`${BASEURL}/api/register`, {
      method: "POST",
      body: formData, // ❌ no headers
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      toast.error(data.message || "Registration failed");
      return;
    }

    if (data.success) {
      localStorage.setItem("otpToken", data.otpToken);
    }

    toast.success("Registration successful");
    navigate("/otpveriefy");

  } catch (error) {
    console.error("register error", error);
    toast.error("Internal server error");
  }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Register Page</h1>

        <form onSubmit={handleSubmit}>

<label>Profile Picture</label>
<input
  type="file"
  name="image"
  accept="image/*"
  onChange={handleChange}
/>


          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            value={registerForm.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={registerForm.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            value={registerForm.password}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>

        <p>
          If you are already registered, <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
