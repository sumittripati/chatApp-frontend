import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
// import { googleAuth } from './api.js'
import { useNavigate } from 'react-router-dom'

const GoogleLogin = () => {
  const navigate = useNavigate()

  const responseGoogle = async (response) => {
    try {
      if (response['code']) {
        const result = await googleAuth(response['code'])
        const { name, email, image } = result.data.user
        const token = result.data.token
        // console.log('result.data.user---', result.data.user)
        // console.log('token---', token)
        const obj = { name, email, image, token }
        localStorage.setItem('user-info', JSON.stringify(obj))
        navigate('/dashboard')
      }
      console.log(response)
    } catch (error) {
      console.error('error while requesting google code', error)
    }
  }

  const login = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  })
  return (
    <div>
      <button style={{ cursor: 'pointer' }} onClick={login}>google login</button>
    </div>
  )
}

export default GoogleLogin
