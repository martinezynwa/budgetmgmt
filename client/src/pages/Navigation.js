import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const { user, logout } = useContext(AuthContext)
  const menuBar = user ? (
    <nav>
      <div>{user.name}</div>
      <Link to="/">Home</Link>
      <Link to="/statistics">Statistics</Link>
      <button type="submit" onClick={logout}>
        logout
      </button>
    </nav>
  ) : (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  )

  return menuBar
}

export default Navigation
