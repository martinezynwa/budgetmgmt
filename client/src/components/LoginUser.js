import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import useAuth from '../context/AuthContext'
import { GOOGLE_AUTH } from '../graphql/mutations'
import { useGoogleLogin } from '@react-oauth/google'
import '../styles/pages/LoginRegister.css'

const LoginUser = () => {
  const context = useAuth()
  const [errors, setErrors] = useState({})
  const [token, setToken] = useState('')

  const [loginViaGoogle] = useMutation(GOOGLE_AUTH, {
    update(_, result) {
      context.login(result.data.googleAuth)
    },
    variables: { idToken: token },
  })

  const triggerLogin = useGoogleLogin({
    onSuccess: ({ code }) => {
      setToken(code)
      loginViaGoogle()
    },
    flow: 'auth-code',
  })

  return (
    <>
      <div className="loginRegisterContainer">
        <button className="customButton" onClick={() => triggerLogin()}>
          Login via Google
        </button>
      </div>
    </>
  )
}

export default LoginUser
