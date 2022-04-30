import React from 'react'
import useNotification from '../context/NotificationContext'
import '../styles/components/Notification.css'

const Notification = () => {
  const { notification } = useNotification()

  if (!notification) {
    return null
  }

  return (
    <div className='notification'>Item successfully {notification}</div>
  )
}

export default Notification
