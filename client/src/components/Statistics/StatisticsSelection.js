import StatisticsList from './StatisticsList'
import { useToggle } from '../../hooks/useToggle'
import { useStatsAndRecordsForm } from '../../hooks/useStatsAndRecordsForm'

const StatisticsSelection = () => {
  const { formVisibility, toggleForm, Toggle } = useToggle()
  const { StatsAndRecordsForm, selectedMonth } = useStatsAndRecordsForm()

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
      <StatisticsList selectedMonth={selectedMonth} />
    </>
  )
}

export default StatisticsSelection
