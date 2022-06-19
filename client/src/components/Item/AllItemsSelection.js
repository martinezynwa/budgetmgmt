import { useEffect } from 'react'
import TotalCard from '../Total/TotalCard'
import useItem from '../../context/ItemsContext'
import { useToggle } from '../../hooks/useToggle'
import { useStatsAndRecordsForm } from '../../hooks/useStatsAndRecordsForm'

const AllRecordsSelection = () => {
  const { getItemsByMonth } = useItem()
  const { formVisibility, toggleForm, Toggle } = useToggle()
  const { StatsAndRecordsForm, selectedMonth } = useStatsAndRecordsForm()

  useEffect(() => {
    getItemsByMonth(selectedMonth)
  }, [selectedMonth, getItemsByMonth])

  return (
    <>
      <div className="form-container">
        <Toggle
          toggleForm={() => toggleForm()}
          formVisibility={formVisibility}
          formName="Filter by month"
        />
        <StatsAndRecordsForm formVisibility={formVisibility} />
      </div>
      <TotalCard selectedMonth={selectedMonth} />
    </>
  )
}

export default AllRecordsSelection
