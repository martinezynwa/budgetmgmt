import ImportData from '../components/ImportExport/ImportData'
import ExportData from '../components/ImportExport/ExportData'
import { ItemProvider } from '../context/ItemsContext'

//page for importing custom CSV and exporting database data into JSON
const Data = () => {
  return (
    <ItemProvider>
      <div className="flex flex-col sm:w-full lg:w-3/4 xl:w-3/5 px-2 sm:ml-12 sm:my-4 gap-8">
        <ImportData />
        <ExportData />
      </div>
    </ItemProvider>
  )
}

export default Data
