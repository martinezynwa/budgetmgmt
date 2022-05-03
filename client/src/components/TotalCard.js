import React from 'react'
import { ALL_USERS, GET_ALL_TIME_TOTALS } from '../graphql/queries'
import '../styles/components/TotalCard.css'
import { useQuery } from '@apollo/client'
import TotalValue from './TotalValue'
import TotalDifference from './TotalDifference'

const dayjs = require('dayjs')

const TotalCard = ({ selectedMonth, showDifference }) => {
  let users = []
  let totals = []
  const result = useQuery(ALL_USERS)
  const resultTotals = useQuery(GET_ALL_TIME_TOTALS)

  if (result.data && result.data.getUsers) {
    users = [...result.data.getUsers]
  }

  if (resultTotals.data && resultTotals.data.getAllTimeTotals) {
    totals = [...resultTotals.data.getAllTimeTotals]
  }

  return (
    <div className="totals">
      <div className="total-header">
        {selectedMonth ? dayjs(selectedMonth).format('MMMM YYYY') : null}
      </div>
      <div className="total">
        <div className="total-name">Total</div>
        <div className="amount">
          <TotalValue username="allUsers" selectedMonth={selectedMonth} /> Kč
        </div>
      </div>
      {users.map(user => (
        <div key={user.name} className="total">
          <div className="total-name">{user.name.split(' ')[0]}</div>
          <div className="amount">
            <TotalValue
              username={user.username}
              selectedMonth={selectedMonth}
            />{' '}
            Kč
            {totals && showDifference ? (
              <TotalDifference username={user.username} totals={totals} />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TotalCard
