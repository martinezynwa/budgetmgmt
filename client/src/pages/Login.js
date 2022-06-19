import LoginUser from '../components/Login/LoginUser'
import { GoogleOAuthProvider } from '@react-oauth/google'

const Login = () => {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <LoginUser />
      </GoogleOAuthProvider>
    </>
  )
}

export default Login
