import { useState } from 'react'
const dayjs = require('dayjs')

/*
used specifically for Statistics and Items pages
adding the search selection form for years and months
*/

export const useStatsAndItemsForm = () => {
  const currentMonth = dayjs(new Date()).format('YYYY-MM')
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  const StatsAndItemsForm = ({ formVisibility }) => {
    const initialState = {
      month: '',
      year: '',
    }
    const [dateInput, setDateInput] = useState(initialState)
    let years = []
    const [errors, setErrors] = useState('')

    //adds available years into the filter
    const availableYears = () => {
      for (let i = 2020; i <= currentMonth.substring(0, 4); i++) {
        years.push(i)
      }
    }

    availableYears()

    const onChange = event => {
      setDateInput({
        ...dateInput,
        [event.target.name]: event.target.value,
      })
    }

    const onSubmit = event => {
      event.preventDefault()
      //check that every single filter is applied
      if (
        !dateInput.month ||
        !dateInput.year ||
        dateInput.month === 'Select month' ||
        dateInput.year === 'Select year'
      ) {
        setErrors('Select all forms')
        return
      }
      setSelectedMonth(dateInput.year + '-' + dateInput.month)
      setErrors('')
    }

    //form not visible by default, with help of useToggle
    if (formVisibility) {
      return null
    }
    console.log('dateInput :>> ', dateInput)

    return (
      <>
        <div className={formVisibility}>
          <form className="item-form" onSubmit={onSubmit}>
            <div className="form-option">
              <label>Year</label>
              <select type="text" name="year" onChange={onChange}>
                <option>Select year</option>
                {years.map(y => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-option">
              <label>Month</label>
              <select type="text" name="month" onChange={onChange}>
                <option>Select month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="form-error">{errors}</div>

            <button className="form-submit">Filter</button>
          </form>
        </div>
      </>
    )
  }

  return {
    StatsAndItemsForm,
    selectedMonth,
  }
}
