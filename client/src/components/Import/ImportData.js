import React, { useState } from 'react'
import Papa from 'papaparse'
import { useConfirmDialog } from '../../hooks/useConfirmDialog'
import ConfirmDialog from '../ConfirmDialog'
import { useMutation } from '@apollo/client'
import { IMPORT_ITEM } from '../../graphql/mutations'
import useNotification from '../../context/NotificationContext'
import '../../styles/components/ImportData.css'
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

    onCompleted: () => {
      setNotification('Items imported', 5)
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
      <h2>Import items</h2>
      <div className="uploadForm">
        <h2>Choose CSV file</h2>
        {importedData.length === 0 ? (
          <>
            <FaUpload className="icon" />
            <label htmlFor="uploadForm" className="uploadFile">
              Import
            </label>
            <input
              id="uploadForm"
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
