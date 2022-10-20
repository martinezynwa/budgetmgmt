import useAuth from '../context/AuthContext'
import { useMutation } from '@apollo/client'
import { NavLink } from 'react-router-dom'
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
  const { user, logout } = useAuth()

  const logoutUser = () => {
    cleanupAfterLogout(user.username)
    logout()
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

  //nav displayed only when user is logged-in
  //using navLink as link to each page
  const menuBar = user.username ? (
    <>
      <aside className="sm:fixed h-full w-0 sm:w-80 sm:pt-5  dark:bg-navColorMobile dark:sm:bg-navColor bg-navColorMobileLight sm:bg-navColorLight">
        <div className="fixed top-0 h-[72px] sm:h-0 flex flex-row sm:static sm:flex sm:flex-row items-center gap-4 px-4 sm:mx-2 py-2 sm:mt-3 mb-6 w-full sm:w-0 dark:sm:bg-transparent dark:navHeadTextColor navHeadTextColorLight dark:bg-navColorMobile bg-navColorMobileLight">
          <div className="sm:ml-2 text-[28px] sm:text-2xl dark:text-navHeadTextColor text-navHeadTextColorLight">
            <FaUser />
          </div>
          {user ? (
            <p className="font-semibold text-navHeadMobile sm:text-navHead dark:text-navHeadTextColor text-navHeadTextColorLight">
              {user.name.split(' ')[0]}
            </p>
          ) : null}
        </div>
        <nav className="flex flex-row sm:static fixed w-full justify-around bottom-0 sm:flex-col dark:bg-navColorMobile bg-navColorMobileLight dark:sm:bg-transparent">
          {menuItems.map(m => (
            <NavLink
              key={m.path}
              to={m.path}
              className={({ isActive }) =>
                isActive
                  ? 'flex flex-col sm:flex-row items-center sm:gap-4 px-1 sm:px-6 p-2 sm:py-3 sm:mx-2 text-nav gap-1 rounded-md font-semibold dark:text-navLinkColorActive text-navLinkColorActiveLight sm:bg-navLinkColorBgActiveLight dark:sm:bg-transparent'
                  : 'last:hidden sm:last:flex flex flex-col sm:flex-row items-center sm:gap-4 px-1 sm:px-6 p-2 sm:py-3 sm:mx-2 text-nav gap-1 font-semibold sm:font-normal hover:font-semibold dark:text-navLinkColor text-navLinkColorLight'
              }>
              <div className="text-2xl">{m.icon}</div>
              <p className="">{m.name}</p>
            </NavLink>
          ))}
        </nav>
        <button
          className="fixed top-2 right-0 sm:static sm:flex sm:flex-row items-center gap-4 pr-3 sm:px-6 py-3 mx-2 text-nav hover:font-semibold dark:text-navLogoutColorMobile text-navLogoutColorMobileLight dark:sm:text-navLogoutColor sm:text-navLogoutColorLight"
          onClick={() => logoutUser()}>
          <div className="text-[28px] sm:text-2xl">
            <FaPowerOff />
          </div>
          <p className="hidden sm:flex">Logout</p>
        </button>
      </aside>
    </>
  ) : null

  return menuBar
}

export default Navigation
