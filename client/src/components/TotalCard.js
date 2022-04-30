import React from 'react'
import { ALL_USERS } from '../graphql/queries'
import '../styles/components/TotalCard.css'
import { useQuery } from '@apollo/client'
import TotalValue from './TotalValue'
const dayjs = require('dayjs')

const TotalCard = () => {
  let users = []
  const result = useQuery(ALL_USERS)

  const currentMonth = dayjs(new Date()).format('MMMM YYYY')

  if (result.data && result.data.getUsers) {
    users = [...result.data.getUsers]
  }

  return (
    <div className="totals">
      <div className="total-header">{currentMonth}</div>
      <div className="total">
        <div className="total-name">Total</div>
        <div className="amount">
          <TotalValue username="allUsers" /> Kč
        </div>
      </div>
      {users.map(user => (
        <div key={user.name} className="total">
          <div className="total-name">{user.name.split(' ')[0]}</div>
          <div className="amount">
            <TotalValue username={user.username} /> Kč
          </div>
        </div>
      ))}
    </div>
  )
}

export default TotalCard
