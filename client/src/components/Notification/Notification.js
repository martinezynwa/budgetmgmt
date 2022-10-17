import { useState, useEffect } from 'react'
import useNotification from '../../context/NotificationContext'
import { FaCheck, FaTimes } from 'react-icons/fa'

const Notification = () => {
  const { notification, type } = useNotification()
  const [style, setStyle] = useState('')

  //setting up styling according to a type of the error
  useEffect(() => {
    type === 'error' ? setStyle('error') : setStyle('success')
  }, [type])

  //no notification on first render
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
