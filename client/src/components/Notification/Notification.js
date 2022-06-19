import { useState, useEffect } from 'react'
import useNotification from '../../context/NotificationContext'
import { FaCheck, FaTimes } from 'react-icons/fa'
import '../../styles/components/Notification.css'

const Notification = () => {
  const { notification, type } = useNotification()
  const [style, setStyle] = useState('')

  useEffect(() => {
    type === 'error' ? setStyle('error') : setStyle('success')
  }, [type])

  if (!notification) {
    return null
  }
  return (
    <div className={`notification ${style}`}>
      <div className="notification-content">
        {type === 'error' ? <FaTimes /> : <FaCheck />}
        <div className="notification-text">{notification}</div>
      </div>
    </div>
  )
}

export default Notification
