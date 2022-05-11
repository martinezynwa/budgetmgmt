import React, { useState } from 'react'
import TotalCard from './TotalCard'
import StatisticsList from '../components/StatisticsList'
import useItem from '../context/ItemsContext'
import { useForm } from '../hooks/useForm'

import '../styles/components/StatSelection.css'

const dayjs = require('dayjs')

const AllRecordsSelection = ({ records }) => {
  const initialState = {
    month: '',
    year: '',
  }
  const [dateInput, setDateInput] = useState(initialState)
  const [selectedMonth, setSelectedMonth] = useState('')
  const [infoTextRecords, setInfoTextRecords] = useState(`Total spent:`)
  const [infoTextCategories, setInfoTextCategories] = useState(
    `Spending per category in ${dayjs(new Date()).format('MMM YYYY')}`,
  )
  const [errors, setErrors] = useState('')
  const { getAllItems } = useItem()
  const { formVisibility, toggleForm, Toggle } = useForm()

  const onChange = event => {
    setDateInput({
      ...dateInput,
      [event.target.name]: event.target.value,
    })
  }
  const onSubmit = event => {
    event.preventDefault()
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
    setInfoTextRecords(
      `Spending in ${dayjs(dateInput.year + dateInput.month).format(
        'MMMM YYYY',
      )}`,
    )
    setInfoTextCategories(
      `Spending per category in ${dayjs(
        dateInput.year + dateInput.month,
      ).format('MMMM YYYY')}`,
    )
    getAllItems(dateInput.year + '-' + dateInput.month)
    setErrors('')
  }

  return (
    <>
      <div className="formContainer">
        <Toggle
          formVisibility={formVisibility}
          toggleForm={() => toggleForm()}
          formName="Filter"
        />
        <div className={formVisibility}>
          <div className="itemForm">
            <form onSubmit={onSubmit}>
              <div className="formControl">
                <label className="formLabel">Year</label>
                <select
                  className="formSelect"
                  type="text"
                  name="year"
                  onChange={onChange}>
                  <option>Select year</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div className="formControl">
                <label className="formLabel">Month</label>
                <select
                  className="formSelect"
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
              </div>
              <span className="error">{errors}</span>

              <button
                variant="primary"
                type="submit"
                className="categoryButton">
                Filter
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="infoText">
        {records ? infoTextRecords : infoTextCategories}
      </div>
      {records ? (
        <TotalCard selectedMonth={selectedMonth} />
      ) : (
        <StatisticsList selectedMonth={selectedMonth} />
      )}
    </>
  )
}

export default AllRecordsSelection
