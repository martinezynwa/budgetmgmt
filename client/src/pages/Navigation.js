import React from 'react'
import useAuth from '../context/AuthContext'
import { useConfirmDialog } from '../hooks/useConfirmDialog'
import { ALL_USERS } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import { NavLink } from 'react-router-dom'
import '../styles/pages/Navigation.css'
import ConfirmDialog from '../components/ConfirmDialog'

import {
  FaUser,
  FaHouseUser,
  FaRegListAlt,
  FaChartBar,
  FaCog,
  FaPowerOff,
  FaFileAlt,
} from 'react-icons/fa'

const Navigation = () => {
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()
  let loggedUser = {}
  const { user, logout } = useAuth()
  const result = useQuery(ALL_USERS)

  if (result.data && result.data.getUsers) {
    const users = [...result.data.getUsers]
    if (user) {
      loggedUser = users.find(u => u.username === user.username)
    }
  }

  const logoutUser = () => {
    logout()
  }

  const dialogConfirmation = confirm => {
    if (confirm) {
      handleActionDialog('', false)
      logoutUser()
    } else {
      handleActionDialog('', false)
    }
  }
  const menuBar = user ? (
    <>
      <aside>
        <div className="navTop">
          <div className="navTopHeader">
            <FaUser className="navIcon" />
            <h2>{loggedUser.name ? loggedUser.name.split(' ')[0] : null}</h2>
          </div>
        </div>

        <div className="navMiddle">
          <NavLink className="navLink" to="/">
            <FaHouseUser className="navIcon" />
            <h3>Home</h3>
          </NavLink>
          <NavLink className="navLink" to="/statistics">
            <FaChartBar className="navIcon" />
            <h3>Statistics</h3>
          </NavLink>
          <NavLink className="navLink" to="/allrecords">
            <FaRegListAlt className="navIcon" />
            <h3>Records</h3>
          </NavLink>
          <NavLink className="navLink" to="/options">
            <FaCog className="navIcon" />
            <h3>Options</h3>
          </NavLink>
          <NavLink className="navLink" to="/data">
            <FaFileAlt className="navIcon" />
            <h3>Data</h3>
          </NavLink>
        </div>

        <div className="navBottom">
          <button
            className="navLogout"
            onClick={() => handleInputMessage('Logout user?')}>
            <FaPowerOff className="navIcon" />
            <h3 className="navLogoutText">Logout</h3>
          </button>
        </div>
      </aside>

      {dialog.isLoading && (
        <ConfirmDialog onDialog={dialogConfirmation} message={dialog.message} />
      )}
    </>
  ) : null

  return menuBar
}

export default Navigation
