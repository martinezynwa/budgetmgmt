import ImportData from '../components/ImportExport/ImportData'
import ExportData from '../components/ImportExport/ExportData'
import { ItemProvider } from '../context/ItemsContext'
import '../styles/pages/ImportExport.css'

//page for importing custom CSV and exporting database data into JSON
const Data = () => {
  return (
    <ItemProvider>
      <ImportData />
      <ExportData />
    </ItemProvider>
  )
}

export default Data
