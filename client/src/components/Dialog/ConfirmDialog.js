/*
dialog requiring confirmation of a specific action
onDialog handling the confirmation of message that either triggers action of a component
or clears the dialog when confirmation dialog is dismissed
*/

const ConfirmDialog = ({ message, onDialog }) => {
  return (
    //clicking outside of the box dismisses the dialog
    <div onClick={() => onDialog(false)} className="confirm-container">
      <div className="confirm-action">
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
