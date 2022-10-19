import ImportData from '../components/ImportExport/ImportData'
import ExportData from '../components/ImportExport/ExportData'
import { ItemProvider } from '../context/ItemsContext'

//page for importing custom CSV and exporting database data into JSON
const Data = () => {
  return (
    <ItemProvider>
      <div className="flex flex-col gap-8 lg:w-3/4 xl:w-3/5 sm:ml-[340px]">
        <ImportData />
        <ExportData />
      </div>
    </ItemProvider>
  )
}

export default Data
