import React, { useReducer, createContext, useContext } from 'react'
import notificationReducer from '../reducers/notificationReducer'

const initialState = {
  notification: null,
  style: null,
}

const NotificationContext = createContext()

let timer = null

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const setNotification = (message, sec, style) => {
    if (timer != null) {
      clearInterval(timer)
    }

    dispatch({
      type: 'MESSAGE',
      data: message,
      style: style,
    })

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
