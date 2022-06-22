import useAuth from '../context/AuthContext'
import { useConfirmDialog } from '../hooks/useConfirmDialog'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import ConfirmDialog from '../components/Dialog/ConfirmDialog'
import {
  FaUser,
  FaHouseUser,
  FaRegListAlt,
  FaChartBar,
  FaCog,
  FaPowerOff,
  FaFileAlt,
} from 'react-icons/fa'
import { ALL_USERS } from '../graphql/queries'
import '../styles/pages/Navigation.css'

//side navigation bar
const Navigation = () => {
  let loggedUser = {}
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()
  const { user, logout } = useAuth()
  const result = useQuery(ALL_USERS)

  if (result.data && result.data.getUsers) {
    const users = [...result.data.getUsers]

    if (user.username) {
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

  //navbar displayed only when user is logged-in
  //using navLink as link to each page
  const menuBar = user.username ? (
    <>
      <aside>
        <div className="nav-top">
          <FaUser className="nav-user-icon" />
          <h1>{loggedUser.name ? loggedUser.name.split(' ')[0] : null}</h1>
        </div>

        <div className="nav-bar">
          <NavLink to="/">
            <FaHouseUser className="nav-icon" />
            <h3>Home</h3>
          </NavLink>
          <NavLink to="/statistics">
            <FaChartBar className="nav-icon" />
            <h3>Statistics</h3>
          </NavLink>
          <NavLink to="/allitems">
            <FaRegListAlt className="nav-icon" />
            <h3>Items</h3>
          </NavLink>
          <NavLink to="/options">
            <FaCog className="nav-icon" />
            <h3>Options</h3>
          </NavLink>
          <NavLink to="/data">
            <FaFileAlt className="nav-icon" />
            <h3>Data</h3>
          </NavLink>
        </div>

        <button
          className="logout-button"
          onClick={() => handleInputMessage('Logout user?')}>
          <FaPowerOff className="nav-icon" />
          <h3>Logout</h3>
        </button>
      </aside>

      {dialog.isLoading && (
        <ConfirmDialog onDialog={dialogConfirmation} message={dialog.message} />
      )}
    </>
  ) : null

  return menuBar
}

export default Navigation
