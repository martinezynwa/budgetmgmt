import React from 'react'
import styles from '../styles/components/ItemCard.module.scss'
import CategoryIcon from './CategoryIcon'
import ItemModal from './ItemModal'
const dayjs = require('dayjs')

const ItemCard = ({ item }) => {
  return (
    <div className={styles.itemCard}>
      <div className={styles.date}>{dayjs(item.itemDate).format('DD MMM')}</div>
      <div className={styles.category}>
        <CategoryIcon itemCategory={item.itemCategory} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{item.itemName}</div>
        <div className={styles.user}>{item.createdBy.name.split(' ')[0]}</div>
      </div>
      <div className={styles.price}>
        {item.itemPrice.price} {item.itemPrice.currency}
      </div>
      <div className={styles.editButton}>
        <ItemModal item={item} />
      </div>
    </div>
  )
}

export default ItemCard
