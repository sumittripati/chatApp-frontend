import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { AppContextProvider } from './contextApi/contextapi.jsx';

createRoot(document.getElementById('root')).render(
  <>
     <AppContextProvider>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" autoClose={2000} pauseOnHover closeOnClick draggable/>
      </BrowserRouter>
    </AppContextProvider>
  </>,
)
