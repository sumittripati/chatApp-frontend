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
        {/* 🔐 Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default App;











// import React from 'react'
// import { Route, Routes, Navigate } from 'react-router-dom'
// import GoogleLogin from './GoogleLogin'
// import Dashboard from './Dashboard'
// import { useState } from 'react'
// import Notfound from './Notfound'
// import RZefreshHandler from './RZefreshHandler'
// import { GoogleOAuthProvider } from '@react-oauth/google'
// const App = () => {


//   const [isAuthenicated, setIsAuthenicated] = useState(null)
//   const GoogleAuthWrapper =()=>{
//     return(
//       <GoogleOAuthProvider clientId='450356136933-2vaoo3g8miau5548d6mc4go9as8041pa.apps.googleusercontent.com'>
//         <GoogleLogin>
//         </GoogleLogin>
//       </GoogleOAuthProvider>
//     )
//   }

//  const PrivateRoute = ({ element }) => {
//   if (isAuthenicated === null) return <h2>Loading...</h2>
//   return isAuthenicated ? element : <Navigate to="/login" />
// }


//   return (
//     <div>
//       <RZefreshHandler setIsAuthenicated={setIsAuthenicated} />
//       <Routes>
//         <Route path="/login" element={<GoogleAuthWrapper />} />
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />}/>} />
//         <Route path="*" element={<Notfound />} />
//         {/* <Route path="/register" element={<Register />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/profile" element={<Profile />} />  */}
//       </Routes>
//     </div>
//   )
// }

// export default App