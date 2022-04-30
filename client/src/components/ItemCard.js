import React from 'react'
import CategoryIcon from './CategoryIcon'
import ItemModal from './ItemModal'
import '../styles/components/ItemCard.css'

const dayjs = require('dayjs')

const ItemCard = ({ item }) => {
  return (
    <div className="itemCard">
      <div className="itemDate">{dayjs(item.itemDate).format('DD MMM')}</div>
      <div className="itemCategory">
        <CategoryIcon itemCategory={item.itemCategory} />
      </div>
      <div className="itemInfo">
        <div className="itemTitle">{item.itemName}</div>
        <div className="itemUser">{item.createdBy.name.split(' ')[0]}</div>
      </div>
      <div className="itemPrice">
        {item.itemPrice.price} {item.itemPrice.currency}
      </div>
      <div className="itemEditButton">
        <ItemModal item={item} />
      </div>
    </div>
  )
}

export default ItemCard
