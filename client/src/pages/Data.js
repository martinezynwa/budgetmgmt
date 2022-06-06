import ImportData from '../components/Import/ImportData'
import ExportData from '../components/Import/ExportData'
import { ItemProvider } from '../context/ItemsContext'

const Data = () => {
  return (
    <ItemProvider>
      <div className="container">
        <ImportData />
        <ExportData />
      </div>
    </ItemProvider>
  )
}

export default Data
