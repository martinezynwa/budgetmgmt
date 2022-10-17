import useAuth from '../context/AuthContext'
import { useMutation } from '@apollo/client'
import { useConfirmDialog } from '../hooks/useConfirmDialog'
import { NavLink } from 'react-router-dom'
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
import { CLEANUP_AFTER_LOGOUT } from '../graphql/mutations'

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

  const menuItems = [
    { path: '/', name: 'Home', icon: <FaHouseUser /> },
    { path: '/statistics', name: 'Statistics', icon: <FaChartBar /> },
    { path: '/allitems', name: 'Items', icon: <FaRegListAlt /> },
    { path: '/options', name: 'Options', icon: <FaCog /> },
    { path: '/data', name: 'Data', icon: <FaFileAlt /> },
  ]

  //navbar displayed only when user is logged-in
  //using navLink as link to each page
  const menuBar = user.username ? (
    <>
      <aside className="sm:fixed h-full w-0 sm:w-80 sm:pt-5 bg-sidebar">
        <div className="fixed top-0 h-[72px] sm:h-0 flex flex-row sm:static sm:flex sm:flex-row items-center gap-4 px-4 sm:mx-2 py-2 sm:mt-3 mb-6 w-full sm:w-0 bg-sidebarActive sm:bg-sidebar">
          <i className="sm:ml-2 text-[28px] text-icon">
            <FaUser />
          </i>
          {user ? (
            <p className="font-semibold text-2xl sm:text-xl">
              {user.name.split(' ')[0]}
            </p>
          ) : null}
        </div>
        <nav className="flex flex-row sm:static fixed w-full justify-around bottom-0 sm:flex-col bg-sidebarActive sm:bg-sidebar">
          {menuItems.map(m => (
            <NavLink
              key={m.path}
              to={m.path}
              className={({ isActive }) =>
                isActive
                  ? `${
                      m.name === 'Data' ? 'sm:flex hidden' : ''
                    } flex flex-col sm:flex-row items-center sm:gap-3 px-1 sm:px-6 p-2 sm:py-3 sm:mx-2 text-md gap-1 rounded-md font-semibold hover:text-black sm:bg-sidebarActive`
                  : `${
                      m.name === 'Data' ? 'sm:flex hidden' : ''
                    } flex flex-col sm:flex-row items-center sm:gap-3 px-1 sm:px-6 p-2 sm:py-3 sm:mx-2 text-md gap-1 hover:font-semibold hover:text-black`
              }>
              <i className="text-2xl text-icon">{m.icon}</i>
              <p className="">{m.name}</p>
            </NavLink>
          ))}
        </nav>
        <button
          className="fixed top-2 right-0 sm:static sm:flex sm:flex-row items-center gap-3 px-6 py-3 mx-2 text-md hover:font-semibold hover:text-black"
          onClick={() => handleInputMessage('Logout user?')}>
          <i className="text-[28px] sm:text-2xl text-icon">
            <FaPowerOff />
          </i>
          <p className="hidden sm:flex">Logout</p>
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
