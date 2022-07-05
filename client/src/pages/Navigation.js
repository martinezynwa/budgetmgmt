import useAuth from '../context/AuthContext'
import { useMutation } from '@apollo/client'
import { useConfirmDialog } from '../hooks/useConfirmDialog'
import { NavLink } from 'react-router-dom'
import ConfirmDialog from '../components/Dialog/ConfirmDialog'
import User from '../components/Navbar/User'
import {
  FaUser,
  FaHouseUser,
  FaRegListAlt,
  FaChartBar,
  FaCog,
  FaPowerOff,
  FaFileAlt,
} from 'react-icons/fa'
import { CLEANUP_AFTER_LOGOUT } from '../graphql/mutations'
import '../styles/pages/Navigation.css'

//side navigation bar
const Navigation = () => {
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()
  const { user, logout } = useAuth()

  const logoutUser = () => {
    cleanupAfterLogout(user.username)
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

  //DEMO mutation to delete all user data after logout
  const [cleanupAfterLogout] = useMutation(CLEANUP_AFTER_LOGOUT, {
    variables: { username: user.username },
  })

  //navbar displayed only when user is logged-in
  //using navLink as link to each page
  const menuBar = user.username ? (
    <>
      <aside>
        <div className="nav-top">
          <FaUser className="nav-user-icon" />
          {user ? <User loggedUser={user} /> : null}
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
