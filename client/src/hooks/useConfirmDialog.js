import { useState } from 'react'

/*
used for confirmation dialogs(logout, editing, deleting, importing, exporting)
component ConfirmDialog handling the look
no dialog is shown until parameter isLoading is true
*/

export const useConfirmDialog = () => {
  //isLoading false by default - nothing requires confirmation yet
  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false,
  })

  //setting up the dialog with imported parameters
  const handleActionDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    })
  }
  
  //setting up default state with message and triggering the dialog
  const handleInputMessage = message => {
    handleActionDialog(message, true)
  }

  return {
    dialog,
    handleInputMessage,
    handleActionDialog,
  }
}
