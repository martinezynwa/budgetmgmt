import { useState } from 'react'
import { useConfirmDialog } from '../../hooks/useConfirmDialog'
import ConfirmDialog from '../../util/ConfirmDialog'
import { FaDownload } from 'react-icons/fa'
import DownloadData from './DownloadData'

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
    <div>
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
    </div>
  )
}

export default ExportData
