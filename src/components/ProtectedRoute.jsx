// import React from 'react'
// import { useAppContext } from './context'
// import { Navigate } from 'react-router-dom'
// import 

// const ProtectedRoute = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default ProtectedRoute


import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from '../contextApi/contextapi'

const ProtectedRoute = () => {

  const { islogin } = useAppContext();

  // 🔐 token check (JWT / auth token)

  // agar token hai → allow
  if (islogin) {
    return <Outlet />;
  }

  // nahi hai → login page
  return <Navigate to="/register" replace />;
};

export default ProtectedRoute;





