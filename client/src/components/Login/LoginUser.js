import { useState } from 'react'
import { useMutation } from '@apollo/client'
import useAuth from '../../context/AuthContext'
import { GOOGLE_AUTH } from '../../graphql/mutations'
import { ALL_USERS } from '../../graphql/queries'
import { useGoogleLogin } from '@react-oauth/google'
import mainLogo from '../../assets/img/mainlogo.png'
import Spinner from '../../util/Spinner'
import { GoogleLoginButton } from 'react-social-login-buttons'
/*
component for Login page
using the react-oauth2 package + react-google-button for logging-in via google account
provider GoogleOAuthProvider is requiring CLIENT_ID to function, stored in .env
when button is clicked, google login appears
selecting a google account triggers the useGoogleLogin hook that handles token creation
token is sent to backend for further handling of login
*/

const LoginUser = () => {
  const context = useAuth()
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  //mutation for google login, token sent to backend
  const [loginViaGoogle] = useMutation(GOOGLE_AUTH, {
    update(_, result) {
      context.login(result.data.googleAuth)
      setLoading(false)
    },
    variables: { idToken: token },
    refetchQueries: () => [
      {
        query: ALL_USERS,
      },
    ],
  })

  const loginButtonClick = () => {
    setLoading(true)
    triggerLogin()
  }

  const triggerLogin = useGoogleLogin({
    onSuccess: ({ code }) => {
      setToken(code)
      setTimeout(() => loginViaGoogle(), 100)
    },
    flow: 'auth-code',
  })

  return (
    <>
      <div className="flex flex-col items-center h-[80vh] sm:h-screen justify-center">
        <img src={mainLogo} alt="mainlogo" className="mb-2" />
        <h2 className="text-xl font font-semibold dark:text-white">Budget management</h2>
        {loading ? (
          <Spinner />
        ) : (
          <GoogleLoginButton
            style={{ width: 'auto', background: '#ffffff' }}
            onClick={() => loginButtonClick()}
          />
        )}
      </div>
    </>
  )
}

export default LoginUser
