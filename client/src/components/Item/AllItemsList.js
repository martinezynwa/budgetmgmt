import { useEffect } from 'react'
import TotalCard from '../Total/TotalCard'
import useItem from '../../context/ItemsContext'
import { useToggle } from '../../hooks/useToggle'
import { useStatsAndItemsForm } from '../../hooks/useStatsAndItemsForm'

//component of AllItems' page, displaying all items according to a filter
const AllItems = () => {
  const { getItemsByMonth } = useItem()
  const { formVisibility, toggleForm, Toggle } = useToggle()
  const { StatsAndItemsForm, selectedMonth } = useStatsAndItemsForm()

  //loading items according to a filter, current month is default
  useEffect(() => {
    getItemsByMonth(selectedMonth)
  }, [selectedMonth, getItemsByMonth])

  return (
    <>
      <div className="flex flex-col justify-between p-4 rounded-xl bg-container cursor-pointer">
        <Toggle
          toggleForm={() => toggleForm()}
          formVisibility={formVisibility}
          formName="Filter by month"
        />
        <StatsAndItemsForm formVisibility={formVisibility} />
      </div>
      <TotalCard selectedMonth={selectedMonth} />
    </>
  )
}

export default AllItems
