import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../context/AuthContext'

//private routes are allowed for logged users
const PrivateRoute = () => {
  const { user } = useAuth()
  return user.username ? <Outlet /> : <Navigate to="/login" />
}

//public route for anyone, only login page is displayed and nothing else can be accessed
const PublicRoute = () => {
  const { user } = useAuth()

  return user.username ? <Navigate to="/" /> : <Outlet />
}

export { PrivateRoute, PublicRoute }
