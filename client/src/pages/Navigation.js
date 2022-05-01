import React, { useState } from 'react'
import useAuth from '../context/AuthContext'
import { ALL_USERS } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import '../styles/pages/Navigation.css'
import { FaTimes, FaBars } from 'react-icons/fa'

const Navigation = () => {
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  let loggedUser = {}
  const { user, logout } = useAuth()
  const result = useQuery(ALL_USERS)

  if (result.data && result.data.getUsers) {
    const users = [...result.data.getUsers]
    if (user) {
      loggedUser = users.find(u => u.username === user.username)
    }
  }

  const menuBar = user ? (
    <>
      <nav className="navbar">
        <Link to="/" className="name">
          {loggedUser.name ? loggedUser.name.split(' ')[0] : null}
        </Link>

        <ul className={click ? 'navMenu active' : 'navMenu'}>
          <li>
            <Link to="/" onClick={handleClick} className="item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/allrecords" onClick={handleClick} className="item">
              All Records
            </Link>
          </li>
          <li>
            <Link to="/statistics" onClick={handleClick} className="item">
              Statistics
            </Link>
          </li>
          <li>
            <Link to="/options" onClick={handleClick} className="item">
              Options
            </Link>
          </li>
          <li>
            <button onClick={logout} className="logout">
              Logout
            </button>
          </li>
        </ul>

        <div className="navIcon" onClick={handleClick}>
          <i>{click ? <FaTimes /> : <FaBars />}</i>
        </div>
      </nav>
    </>
  ) : (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  )

  return menuBar
}

export default Navigation
