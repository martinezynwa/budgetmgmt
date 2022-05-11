import { useState } from 'react'

export const useConfirmDialog = () => {
  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false,
  })

  const handleActionDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    })
  }

  const handleInputMessage = message => {
    handleActionDialog(message, true)
  }

  return {
    dialog,
    handleInputMessage,
    handleActionDialog,
  }
}
