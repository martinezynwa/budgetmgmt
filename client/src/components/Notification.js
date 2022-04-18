import React from 'react'
import useNotification from '../context/NotificationContext'

const Notification = () => {
  const { notification } = useNotification()
  if (!notification) return null

  if (notification === 'SUCCESS') {
    return <div>success</div>
  }

  if (notification === 'ERROR') {
    return <div>error</div>
  }

  return <div>{notification}</div>
}

export default Notification
