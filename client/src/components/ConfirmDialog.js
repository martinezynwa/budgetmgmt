import '../styles/popup.css'

function ConfirmDialog({ message, onDialog }) {
  return (
    <div onClick={() => onDialog(false)} className="confirmContainer">
      <div onClick={e => e.stopPropagation()} className="confirmAction">
        <div className="confirmActionMessage">{message}</div>
        <div className="confirmButtons">
          <button onClick={() => onDialog(true)} className="confirmButtonYes">
            Yes
          </button>
          <button onClick={() => onDialog(false)} className="confirmButtonNo">
            No
          </button>
        </div>
      </div>
    </div>
  )
}
export default ConfirmDialog
