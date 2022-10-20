import { useState } from 'react'
import DownloadData from './DownloadData'
import { FaDownload } from 'react-icons/fa'

//for triggering component DownloadData that downloads all items from database
const ExportData = () => {
  const [download, setDownload] = useState(false)

  return (
    <>
      <div className="page-container items-center">
        <h2 className="page-container-header">
          Export to JSON
        </h2>
        <FaDownload className="text-4xl mb-2 dark:text-iconColor text-iconColorLight" />
        <button
          className="page-container-button"
          onClick={() => setDownload(true)}>
          Export
        </button>
      </div>
      {download ? <DownloadData /> : null}
    </>
  )
}

export default ExportData
