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

    return (
      <>
        <div className={formVisibility}>
          <form
            className="flex flex-col justify-between gap-4 my-4"
            onSubmit={onSubmit}>
            <select
              className="w-full p-2 rounded-md bg-slate-50"
              type="text"
              name="year"
              onChange={onChange}>
              <option>Select year</option>
              {years.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              className="w-full p-2 rounded-md bg-slate-50"
              type="text"
              name="month"
              onChange={onChange}>
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
            {errors ? (
              <div className="p-1 text-red-600">{errors}</div>
            ) : null}
            <button className="w-full p-2 rounded-lg text-lg font-semibold bg-sidebarActive">
              Filter
            </button>
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
