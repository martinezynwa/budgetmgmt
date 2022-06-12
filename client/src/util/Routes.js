import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import useAuth from '../context/AuthContext'

const PrivateRoute = () => {
  const { user } = useAuth()
  return user.username ? <Outlet /> : <Navigate to="/login" />
}

const PublicRoute = () => {
  const { user } = useAuth()

  return user.username ? <Navigate to="/" /> : <Outlet />
}

export { PrivateRoute, PublicRoute }
