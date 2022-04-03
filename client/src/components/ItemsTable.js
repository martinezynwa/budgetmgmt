import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import DeleteButton from '../components/DeleteButton'
import { Table } from 'react-bootstrap'
import { CURRENT_MONTH } from '../graphql/queries'

const ItemsTable = () => {
  const result = useQuery(CURRENT_MONTH)

  const [itemsInMonth, setItemsInMonth] = useState([])

  useEffect(() => {
    if (result.data) {
      setItemsInMonth([...result.data.getCurrentMonth])
    }
  }, [result.data])

  return (
    <div>
      <h1>Items</h1>
      <Table size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {itemsInMonth.map(item => (
            <tr key={item.id}>
              <td>{item.itemDate}</td>
              <td>{item.itemName}</td>
              <td>{item.itemCategory}</td>
              <td>
                {item.itemPrice.price} {item.itemPrice.currency}
              </td>
              <td>{<DeleteButton itemId={item.id} />} </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ItemsTable
