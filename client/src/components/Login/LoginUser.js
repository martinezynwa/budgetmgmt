import { useState } from 'react'
import { useMutation } from '@apollo/client'
import useAuth from '../../context/AuthContext'
import { GOOGLE_AUTH } from '../../graphql/mutations'
import { ALL_USERS } from '../../graphql/queries'
import { useGoogleLogin } from '@react-oauth/google'
import GoogleButton from 'react-google-button'
import mainLogo from '../../assets/img/mainlogo.png'
import Spinner from '../../util/Spinner'

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
      <div className="flex flex-col items-center h-[60vh] sm:h-[80vh] justify-center">
        <img src={mainLogo} alt="mainlogo" />
        <h2 className="font-semibold text-xl mb-1">Expense tracker</h2>
        {loading ? (
          <Spinner />
        ) : (
          <GoogleButton onClick={() => loginButtonClick()} />
        )}
      </div>
    </>
  )
}

export default LoginUser
