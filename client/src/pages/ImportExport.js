import ImportData from '../components/ImportExport/ImportData'
import ExportData from '../components/ImportExport/ExportData'
import { ItemProvider } from '../context/ItemsContext'
import '../styles/pages/ImportExport.css'

const Data = () => {
  return (
    <ItemProvider>
      <ImportData />
      <ExportData />
    </ItemProvider>
  )
}

export default Data
