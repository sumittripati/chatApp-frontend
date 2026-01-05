import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth } from '../api'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../contextApi/contextapi'

const GoogleLogin = () => {
  const navigate = useNavigate()
  const { login: contextLogin } = useAppContext();

  const responseGoogle = async (response) => {
    try {
      if (response['code']) {
        const result = await googleAuth(response['code'])
        const { user, token } = result.data
        // console.log('user---', user)
        // console.log('token---', token)
        contextLogin(token, user);
        navigate('/')
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
