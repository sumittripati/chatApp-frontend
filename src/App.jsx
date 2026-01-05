// import React from 'react'
// import Home from './pages/Home/Home'
// import Service from './pages/Service.jsx'
// import { Routes, Route } from "react-router-dom";
// import Header from './components/Header/Header'
// import Footer from './components/footer/Footer'
// import Login from './pages/Authentication/Login.jsx'
// import Register from './pages/Authentication/Register.jsx'
// import ForgetPassword from './pages/Authentication/ForgetPassword.jsx'
// import ResetPassword from './pages/Authentication/ResetPassword.jsx'
// import ChangePassword from './pages/Authentication/ChangePassword.jsx'
// import Otpveriefy from './pages/Authentication/Otpveriefy.jsx'
// import ProtectedRoute from './components/ProtectedRoute.jsx'

// const App = () => {
//   return (
//     <>
//     <Header/>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       {/* <Route path="/about" element={<About />} />
//        */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/service" element={<Service />} />
//       </Route>
   

//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path='otpveriefy' element={<Otpveriefy/>}/>
//       <Route path="/forgetpassword" element={<ForgetPassword />} />
//       <Route path="/resetpassword" element={<ResetPassword />} />
//       <Route path="/changepassword" element={<ChangePassword />} />
      

//     </Routes>
//     <Footer/>
//     </>
    
//   )
// }

// export default App


import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Otpveriefy from "./pages/Authentication/Otpveriefy";


// pages
import Home from "./pages/Home/Home";
import Service from "./pages/Service";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";

const App = () => {
  return (
    <Routes>

      {/* ❌ Auth pages (NO header/footer) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otpveriefy" element={<Otpveriefy />} />
      </Route>

      {/* ✅ Main layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        {/* 🔐 Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/service" element={<Service />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default App;

