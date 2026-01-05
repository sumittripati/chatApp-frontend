import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyUser } from './api'

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logoutUser = () => {
    localStorage.removeItem('user-info')
    navigate('/login')
  }

  useEffect(() => {
    const stored = localStorage.getItem('user-info')

    if (!stored) {
      logoutUser()
      return
    }

    let parsed
    try {
      parsed = JSON.parse(stored)
    } catch {
      logoutUser()
      return
    }

    const token = parsed?.token
    if (!token) {
      logoutUser()
      return
    }

    const verifyAndLogin = async () => {
      try {
        await verifyUser(token)   // 🔐 backend verification
        setUser(parsed)
        setLoading(false)
      } catch (err) {
        logoutUser()
      }
    }

    verifyAndLogin()
  }, [])

  if (loading) return <h2>Loading...</h2>

  return (
    <div>
      <h2>Dashboard</h2>
      <h1>Welcome {user?.name}</h1>
      <h3>{user?.email}</h3>
      {user?.image && <img src={user.image} alt="profile" />}
      <button onClick={logoutUser}>Logout</button>
    </div>
  )
}

export default Dashboard
