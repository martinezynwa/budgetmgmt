import { useState } from 'react'
import Papa from 'papaparse'
import { useConfirmDialog } from '../../hooks/useConfirmDialog'
import ConfirmDialog from '../../util/ConfirmDialog'
import { useMutation } from '@apollo/client'
import { IMPORT_ITEM } from '../../graphql/mutations'
import useNotification from '../../context/NotificationContext'
import { FaUpload } from 'react-icons/fa'

const ImportData = () => {
  const { setNotification } = useNotification()
  const [importedData, setImportedData] = useState([])
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()
  let objectWithImportedData = {}

  const changeHandler = event => {
    if (event.target.files[0].type !== 'text/csv') {
      setNotification('File is not in CSV format', 5, 'error')
      return
    }

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        setImportedData(results.data)
      },
    })
  }

  const [importItem] = useMutation(IMPORT_ITEM, {
    variables: objectWithImportedData,
    onError() {
      setNotification('CSV is not structured correctly', 5, 'error')
      setImportedData([])
    },

    onCompleted: res => {
      setNotification(res, 5)
      setImportedData([])
    },
  })

  const dialogConfirmation = confirm => {
    if (confirm) {
      handleActionDialog('', false)
      objectWithImportedData['importInput'] = importedData
      importItem(objectWithImportedData)
    } else {
      handleActionDialog('', false)
    }
  }

  return (
    <>
      <div className="upload-form">
        <h2>Import CSV file</h2>
        {importedData.length === 0 ? (
          <>
            <FaUpload className="icon" />
            <label htmlFor="upload-form" className="upload-file">
              Import
            </label>
            <input
              id="upload-form"
              type="file"
              name="file"
              accept=".csv"
              onChange={changeHandler}
            />
          </>
        ) : null}

        {importedData.length !== 0 ? (
          <div>
            <h3>{`${importedData.length} items ready to be imported`}</h3>
            <button onClick={() => handleInputMessage('Import items?')}>
              Import
            </button>
            <button onClick={() => setImportedData([])}>Cancel</button>
          </div>
        ) : null}
      </div>
      {dialog.isLoading && (
        <ConfirmDialog onDialog={dialogConfirmation} message={dialog.message} />
      )}
    </>
  )
}

export default ImportData
