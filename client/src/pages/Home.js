import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import DeleteButton from '../components/DeleteButton'

import { CURRENT_MONTH } from '../graphql/queries'
import ItemForm from '../components/ItemForm'
import { Table } from 'react-bootstrap'

const Home = props => {
  const result = useQuery(CURRENT_MONTH)

  const [itemsInMonth, setItemsInMonth] = useState([])

  useEffect(() => {
    if (result.data) {
      setItemsInMonth([...result.data.getCurrentMonth])
    }
  }, [result.data])

  return (
    <div>
      <ItemForm />
      <h1>Items</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {itemsInMonth.map(item => (
            <tr key={item.id}>
              <td>{item.itemName}</td>
              <td>{item.itemDate}</td>
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

export default Home
