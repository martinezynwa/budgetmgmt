import { useState } from 'react'
import { useMutation } from '@apollo/client'
import useAuth from '../../context/AuthContext'
import { GOOGLE_AUTH } from '../../graphql/mutations'
import { useGoogleLogin } from '@react-oauth/google'
import mainLogo from '../../assets/img/mainlogo.png'
import GoogleButton from 'react-google-button'
import '../../styles/pages/Login.css'

const LoginUser = () => {
  const context = useAuth()
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
      <div className="login-container">
        <div className="items">
          <img src={mainLogo} alt="mainlogo" />
          <h2>Expense tracker</h2>
          <GoogleButton className='login-button' onClick={() => triggerLogin()} />
        </div>
      </div>
    </>
  )
}

export default LoginUser
