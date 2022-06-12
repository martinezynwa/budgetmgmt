import LoginUser from '../components/LoginUser'
import { GoogleOAuthProvider } from '@react-oauth/google'
import '../styles/pages/LoginRegister.css'

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
