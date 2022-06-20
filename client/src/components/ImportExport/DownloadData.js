import { useQuery } from '@apollo/client'
import { saveAs } from 'file-saver'
import { ALL_ITEMS } from '../../graphql/queries'
const dayjs = require('dayjs')

//using the file-saver package to download database contents into JSON file
const DownloadData = () => {
  const result = useQuery(ALL_ITEMS)

  if (result.loading) {
    return null
  }

  //setting-up item name + format
  const itemName = `data_${dayjs(new Date()).format('YYYYMMDD_HHmmss')}`
  const fileToSave = new Blob([JSON.stringify(result.data.getItems)], {
    type: 'application/json',
    name: itemName,
  })
  saveAs(fileToSave, itemName)

  return null
}

export default DownloadData
