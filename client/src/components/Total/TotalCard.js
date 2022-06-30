import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_USERS, GET_ALL_TIME_TOTALS } from '../../graphql/queries'
import TotalValue from '../Total/TotalValue'
import TotalDifference from './TotalDifference'
import { FaInfoCircle } from 'react-icons/fa'
const dayjs = require('dayjs')

//component displaying total spending per each user+all users
const TotalCard = ({ selectedMonth }) => {
  let users = []
  let totals = []
  const [differenceVisibility, setDifferenceVisibility] = useState(false)
  const result = useQuery(ALL_USERS)
  const resultTotals = useQuery(GET_ALL_TIME_TOTALS)

  if (result.data && result.data.getUsers) {
    users = [...result.data.getUsers]
  }

  if (resultTotals.data && resultTotals.data.getAllTimeTotals) {
    totals = [...resultTotals.data.getAllTimeTotals]
  }

  const hideDifferences = () => {
    differenceVisibility
      ? setDifferenceVisibility(false)
      : setDifferenceVisibility(true)
  }

  return (
    <>
      <div className="total-card">
        <div className="total-header">
          <h1>
            {selectedMonth
              ? `Spending in ${dayjs(selectedMonth).format('MMMM YYYY')}`
              : null}
          </h1>
          <FaInfoCircle
            className="difference-button"
            onClick={() => hideDifferences()}>
            Differences
          </FaInfoCircle>
        </div>

        <div className="total">
          <h2>Total</h2>
          <div className="amount">
            <TotalValue username="allUsers" selectedMonth={selectedMonth} /> Kč
          </div>
        </div>
        {/* listing each user and displaying total spent per month */}
        {users.map(user => (
          <div key={user.name} className="total">
            <h2>{user.name.split(' ')[0]}</h2>
            <div className="amount">
              <TotalValue
                username={user.username}
                selectedMonth={selectedMonth}
              />{' '}
              Kč
              {/* historical difference between users */}
              <TotalDifference
                username={user.username}
                totals={totals}
                show={differenceVisibility}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TotalCard
