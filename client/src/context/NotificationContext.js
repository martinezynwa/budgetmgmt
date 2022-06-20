import React, { useReducer, createContext, useContext } from 'react'
import notificationReducer from '../reducers/notificationReducer'

//context for notifications
const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const notificationState = {
    notification: null,
    style: null,
  }
  let timer = null
  const [state, dispatch] = useReducer(notificationReducer, notificationState)

  //show notification for a specific period of time with required style
  //linked to component Notification that handles the displaying
  const setNotification = (message, sec, style) => {
    if (timer != null) {
      clearInterval(timer)
    }

    dispatch({
      type: 'MESSAGE',
      data: message,
      style: style,
    })

    //hide notification after some time
    timer = setTimeout(() => {
      dispatch({
        type: 'MESSAGE',
        data: '',
        style: '',
      })
    }, sec * 750)
  }

  const value = {
    notification: state.notification,
    type: state.style,
    setNotification,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

const useNotification = () => {
  const context = useContext(NotificationContext)

  if (context === undefined) {
    throw new Error('useNotification must be used within NotificationContext')
  }

  return context
}

export default useNotification
