import React, { useState, useEffect } from 'react'
import useNotification from '../context/NotificationContext'
import { FaCheck, FaTimes } from 'react-icons/fa'
import '../styles/components/Notification.css'

const Notification = () => {
  const { notification, type } = useNotification()
  const [style, setStyle] = useState('')

  useEffect(() => {
    type === 'error'
      ? setStyle('notificationError')
      : setStyle('notificationSuccess')
  }, [type])

  if (!notification) {
    return null
  }

  return (
    <div className="notificationContainer">
      <div className={style}>
        <div className="notificationContent">
          {type === 'error' ? (
            <FaTimes className="notificationIcon" />
          ) : (
            <FaCheck className="notificationIcon" />
          )}
          <div className="notificationText">{notification}</div>
        </div>
      </div>
    </div>
  )
}

export default Notification
