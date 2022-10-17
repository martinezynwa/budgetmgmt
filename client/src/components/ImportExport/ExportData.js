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
      <div className="flex flex-col gap-4 items-center p-4 rounded-xl bg-container cursor-pointer">
        <h2 className="text-xl sm:text-2xl mb-6 mr-4 font-semibold">
          Export to JSON
        </h2>
        <FaDownload className="text-4xl" />
        <button
          className="w-full mt-3 p-2 rounded-lg text-lg font-semibold bg-sidebarActive"
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
