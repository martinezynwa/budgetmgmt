import { useState, useEffect } from 'react'
import { useToggle } from '../../hooks/useToggle'
import { useMutation } from '@apollo/client'
import { SET_THEME } from '../../graphql/mutations'
import useNotification from '../../context/NotificationContext'

const ThemeSetting = () => {
  const [darkTheme, setDarkTheme] = useState(false)
  const { formVisibility, toggleForm, Toggle } = useToggle()
  const { setNotification } = useNotification()

  useEffect(() => {
    const darkTheme = localStorage.getItem('darkTheme')
    setDarkTheme(darkTheme === 'true' ? true : false)
  }, [])

  //mutation to change an username
  const [changeTheme] = useMutation(SET_THEME, {
    variables: { darkTheme: !darkTheme },

    onError(err) {
      setNotification({
        message: err.message,
        style: 'error',
      })
    },
    onCompleted: res => {
      localStorage.setItem('darkTheme', darkTheme)
      darkTheme
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark')
    },
  })
  const handleThemeSetting = () => {
    setDarkTheme(!darkTheme)
    changeTheme()
  }

  return (
    <div className="page-container cursor-pointer">
      <Toggle
        formVisibility={formVisibility}
        toggleForm={() => toggleForm()}
        formName="Set Theme"
      />
      <div className={formVisibility}>
        <button
          onClick={() => handleThemeSetting()}
          className="page-container-button">
          {`Set ${darkTheme ? 'light' : 'dark'} theme`}
        </button>
      </div>
    </div>
  )
}

export default ThemeSetting
