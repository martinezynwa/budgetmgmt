import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CategorySelect from './CategorySelect'
import formStyles from '../styles/components/ItemForm.module.scss'
import { FaEdit } from 'react-icons/fa'

import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

const ItemModal = ({ item }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const initialState = {}
  const [itemInput, setItemInput] = useState(initialState)

  const onChange = event => {
    setItemInput({
      ...itemInput,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div>
      <FaEdit
        className={formStyles.editButton}
        variant="primary"
        onClick={handleShow}>
        Edit
      </FaEdit>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={formStyles.itemForm}>
            <form>
              <div className={formStyles.formControl}>
                <label>Date</label>
                <input
                  type="date"
                  name="itemDate"
                  id="date"
                  placeholder={item.itemDate}
                  value={itemInput.itemDate}
                  onChange={onChange}
                />
              </div>

              <div className={formStyles.formControl}>
                <label>Item</label>
                <input
                  type="text"
                  name="itemName"
                  placeholder={item.itemName}
                  value={itemInput.itemName}
                  onChange={onChange}
                />
              </div>

              <div className={formStyles.formControl}>
                <label>Category</label>
                <select
                  type="text"
                  name="itemCategory"
                  placeholder={item.itemCategory}
                  value={itemInput.itemCategory}
                  onChange={onChange}>
                  <CategorySelect category={item.itemCategory} />
                </select>
              </div>

              <div className={formStyles.formControl}>
                <label>Price</label>
                <input
                  type="text"
                  name="itemPrice"
                  placeholder={item.itemPrice.price}
                  value={itemInput.itemPrice}
                  onChange={onChange}
                />
              </div>
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <DeleteButton itemId={item.id} />
          <EditButton
            itemId={item.id}
            itemInput={itemInput}
            onSubmit={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ItemModal
