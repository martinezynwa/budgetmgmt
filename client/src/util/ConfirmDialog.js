const ConfirmDialog = ({ message, onDialog }) => {
  return (
    <div onClick={() => onDialog(false)} className="confirm-container">
      <div onClick={e => e.stopPropagation()} className="confirm-action">
        <div className="confirm-action-message">{message}</div>
        <div className="confirm-buttons">
          <button
            onClick={() => onDialog(true)}
            className="confirm confirm-yes">
            Yes
          </button>
          <button
            onClick={() => onDialog(false)}
            className="confirm confirm-no">
            No
          </button>
        </div>
      </div>
    </div>
  )
}
export default ConfirmDialog
