import useNotification from '../../context/NotificationContext'

const Notification = () => {
  const { message } = useNotification()
  return (
    <>
      <div className="fixed top-2 sm:top-4 sm:right-6 w-full sm:w-auto px-2">
        <div
          className={`p-4 sm:p-8 text-center font-semibold sm:text-start ${
            message.style ? ' ' : 'hidden '
          }{${
            message.style === 'success' ? ' bg-green-200 ' : ' bg-red-200 '
          } rounded-lg`}>
          <h2 className="text-base font-semibold sm:-my-3">
            {message.message}
          </h2>
        </div>
      </div>
    </>
  )
}

export default Notification
