import { useState } from 'react'
import DownloadData from './DownloadData'
import { FaDownload } from 'react-icons/fa'

//for triggering component DownloadData that downloads all items from database
const ExportData = () => {
  const [download, setDownload] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-4 items-center p-4 rounded-xl bg-container cursor-pointer">
        <h2 className="text-headMobile sm:text-head mb-6 mr-4 font-semibold">
          Export to JSON
        </h2>
        <FaDownload className="text-4xl" />
        <button
          className="w-full mt-3 p-2 rounded-lg text-button font-semibold bg-buttonColor hover:bg-hoverButton"
          onClick={() => setDownload(true)}>
          Export
        </button>
      </div>
      {download ? <DownloadData /> : null}
    </>
  )
}

export default ExportData
