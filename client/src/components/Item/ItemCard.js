import React from 'react'
import CategoryIcon from '../Category/CategoryIcon'
import ItemModal from './ItemModal'
const dayjs = require('dayjs')

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <div className="item-date">{dayjs(item.itemDate).format('DD MMM')}</div>
      <div className="item-category">
        <CategoryIcon itemCategory={item.itemCategory} />
      </div>
      <div className="item-info">
        <div className="item-title">{item.itemName}</div>
        <div className="item-user">{item.createdBy.name.split(' ')[0]}</div>
      </div>
      <div className="item-end">
        <div className="item-price">
          {item.itemPrice.price} {item.itemPrice.currency}
        </div>
        <div className="item-edit-button">
          <ItemModal item={item} />
        </div>
      </div>
    </div>
  )
}

export default ItemCard
