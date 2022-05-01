import React from 'react'
import { ALL_USERS } from '../graphql/queries'
import '../styles/components/TotalCard.css'
import { useQuery } from '@apollo/client'
import TotalValue from './TotalValue'

const TotalCard = ({ selectedMonth }) => {
  let users = []
  const result = useQuery(ALL_USERS)

  if (result.data && result.data.getUsers) {
    users = [...result.data.getUsers]
  }

  return (
    <div className="totals">
      <div className="total-header">{selectedMonth}</div>
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
            <div className="difference">-45 Kč</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TotalCard
