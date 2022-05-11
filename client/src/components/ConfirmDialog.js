import '../styles/popup.css'

function ConfirmDialog({ message, onDialog }) {
  return (
    <div onClick={() => onDialog(false)} className="confirmDeleteContainer">
      <div onClick={e => e.stopPropagation()} className="confirmDelete">
        <div className="confirmDeleteMessage">{message}</div>
        <div>
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
