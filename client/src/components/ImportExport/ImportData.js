import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useConfirmDialog } from '../../hooks/useConfirmDialog'
import useNotification from '../../context/NotificationContext'
import ConfirmDialog from '../Dialog/ConfirmDialog'
import { IMPORT_ITEM } from '../../graphql/mutations'
import Papa from 'papaparse'
import { FaUpload } from 'react-icons/fa'

/*
component for import of items from CSV
currently only custom structure is supported
CSV must be in the following format in order to be correctly imported:
Header:Name;Year;Date;Transaction;Price;Type
example of items: Name;2022;01.01;Transaction;9 CZK;Type
*/
const ImportData = () => {
  const { setNotification } = useNotification()
  const [importedData, setImportedData] = useState([])
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()
  let objectWithImportedData = {}

  const changeHandler = event => {
    //check that file is in correct format and size is less than 100kb
    if (event.target.files[0].type !== 'text/csv') {
      setNotification('File is not in CSV format', 5, 'error')
      return
    }

    if (event.target.files[0].size > 100000) {
      setNotification('File is too big', 5, 'error')
      return
    }

    if (1 + 1 === 2) {
      setNotification(
        'Import functionality disabled in demo version',
        5,
        'error',
      )
      return
    }

    //CSV parser to JSON format
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        setImportedData(results.data)
      },
    })
  }

  //mutation for importing the parsed CSV(in JSON format) to backend where item is created accordingly
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
      objectWithImportedData['importInput'] = importedData //naming the object for backend purposes
      importItem(objectWithImportedData)
    } else {
      handleActionDialog('', false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 items-center p-4 rounded-xl bg-container cursor-pointer">
        <h2 className="text-xl sm:text-2xl mb-6 mr-4 font-semibold">
          Import CSV file
        </h2>
        {/* button for addition only appears if imported CSV contains something */}
        {importedData.length === 0 ? (
          <>
            <FaUpload className="text-4xl" />
            <label
              htmlFor="upload-form"
              className="w-full mt-3 p-2 rounded-lg text-lg font-semibold bg-sidebarActive text-center">
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
