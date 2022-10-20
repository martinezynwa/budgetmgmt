import ImportData from '../components/ImportExport/ImportData'
import ExportData from '../components/ImportExport/ExportData'
import { ItemProvider } from '../context/ItemsContext'

//page for importing custom CSV and exporting database data into JSON
const Data = () => {
  return (
    <ItemProvider>
      <div className="page">
        <ImportData />
        <ExportData />
      </div>
    </ItemProvider>
  )
}

export default Data
