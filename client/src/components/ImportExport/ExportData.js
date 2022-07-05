import { useState } from 'react'
import { useConfirmDialog } from '../../hooks/useConfirmDialog'
import ConfirmDialog from '../Dialog/ConfirmDialog'
import DownloadData from './DownloadData'
import { FaDownload } from 'react-icons/fa'

//for triggering component DownloadData that downloads all items from database
const ExportData = () => {
  const [download, setDownload] = useState(false)
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()

  const dialogConfirmation = confirm => {
    if (confirm) {
      setDownload(true)
      handleActionDialog('', false)
    } else {
      handleActionDialog('', false)
    }
  }

  return (
    <>
      <div className="upload-form">
        <h2>Export to JSON</h2>
        <FaDownload className="icon" />
        <button
          onClick={() => handleInputMessage('Export all items into json?')}>
          Export
        </button>
      </div>
      {dialog.isLoading && (
        <ConfirmDialog onDialog={dialogConfirmation} message={dialog.message} />
      )}
      {download ? <DownloadData /> : null}
    </>
  )
}

export default ExportData
