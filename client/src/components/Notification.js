import React from 'react'
import useNotification from '../context/NotificationContext'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { notification } = useNotification()

  if (!notification) {
    return null
  }

  return (
    <div>
      <Alert key={'success'} variant={'success'}>
        Item successfully {notification}
      </Alert>
    </div>
  )
}

export default Notification
