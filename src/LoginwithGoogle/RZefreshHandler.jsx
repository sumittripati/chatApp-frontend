// import React, { useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'

// const RZefreshHandler = ({setIsAuthenicated}) => {
//     const navigate = useNavigate()
//     const location = useLocation()

//     useEffect(() => {
//        const data = localStorage.getItem('user-info')
//        const token = JSON.parse(data)?.token
//        if(token){
//         setIsAuthenicated(true)
//         if(location.pathname === '/' || location.pathname === '/login' ){
//             navigate('/dashboard', {replace: false})
//         }
//        }
//     }, [location, navigate, setIsAuthenicated])
  
//   return null
// }

// export default RZefreshHandler


//  Frontend me Token Expiry Check
import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";


const RZefreshHandler = ({ setIsAuthenicated }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const data = localStorage.getItem('token')
    if (!data) return

    const { token } = JSON.parse(data)

    if (!token) return

    try {
      const decoded = jwtDecode(token)
      const isExpired = decoded.exp * 1000 < Date.now()

      if (isExpired) {
        localStorage.removeItem('token')
        setIsAuthenicated(false)
        navigate('/login')
        return
      }

      setIsAuthenicated(true)

      if (location.pathname === '/' || location.pathname === '/login') {
        navigate('/dashboard')
      }

    } catch (err) {
      localStorage.removeItem('token')
      setIsAuthenicated(false)
      navigate('/login')
    }

  }, [location, navigate, setIsAuthenicated])

  return null
}

export default RZefreshHandler
