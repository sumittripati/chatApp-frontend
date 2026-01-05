import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AppContextProvider } from './contextApi/contextapi.jsx';

createRoot(document.getElementById('root')).render(
  <>
     <AppContextProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" autoClose={2000} pauseOnHover closeOnClick draggable/>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </AppContextProvider>
  </>,
)
