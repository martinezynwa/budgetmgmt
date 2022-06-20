import StatisticsList from './StatisticsList'
import { useToggle } from '../../hooks/useToggle'
import { useStatsAndItemsForm } from '../../hooks/useStatsAndItemsForm'

//allows selection of spending statistics per requested month
const StatisticsSelection = () => {
  const { formVisibility, toggleForm, Toggle } = useToggle()
  const { StatsAndItemsForm, selectedMonth } = useStatsAndItemsForm()

  return (
    <>
      <div className="form-container">
        <Toggle
          toggleForm={() => toggleForm()}
          formVisibility={formVisibility}
          formName="Filter by month"
        />
        <StatsAndItemsForm formVisibility={formVisibility} />
      </div>
      <StatisticsList selectedMonth={selectedMonth} />
    </>
  )
}

export default StatisticsSelection
