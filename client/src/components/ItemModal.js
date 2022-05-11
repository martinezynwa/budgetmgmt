import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import CategorySelect from './CategorySelect'
import '../styles/components/ItemForm.css'
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
      <FaEdit className="formEditButton" variant="primary" onClick={handleShow}>
        Edit
      </FaEdit>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit item</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalContainer">
          <form>
            <div className="formControl">
              <label className="formLabel">Date</label>
              <input
                className="formInput"
                type="date"
                name="itemDate"
                id="date"
                placeholder={item.itemDate}
                value={itemInput.itemDate}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="formLabel">Item</label>
              <input
                className="formInput"
                type="text"
                name="itemName"
                placeholder={item.itemName}
                value={itemInput.itemName}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="formLabel">Category</label>
              <select
                className="formSelect"
                type="text"
                name="itemCategory"
                placeholder={item.itemCategory}
                value={itemInput.itemCategory}
                onChange={onChange}>
                <CategorySelect category={item.itemCategory} />
              </select>
            </div>

            <div>
              <label className="formLabel">Price</label>
              <input
                className="formInput"
                type="text"
                name="itemPrice"
                placeholder={item.itemPrice.price}
                value={itemInput.itemPrice}
                onChange={onChange}
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="modalButton"
            variant="secondary"
            onClick={handleClose}>
            Close
          </button>
          <DeleteButton item={item} />
          <EditButton
            item={item}
            itemInput={itemInput}
            onSubmit={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ItemModal
