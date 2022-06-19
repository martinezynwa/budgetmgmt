import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import '../styles/components/Toggle.css'

export const useToggle = () => {
  const [formVisibility, setFormVisibility] = useState('form-invisible')

  const Toggle = ({ formVisibility, toggleForm, formName }) => {
    return (
      <div className="toggle-bar">
        <button className="toggle-button" onClick={() => toggleForm()}>
          {formName}
        </button>
        {formVisibility ? (
          <FaPlus className="toggle-sign" />
        ) : (
          <FaMinus className="toggle-sign" />
        )}
      </div>
    )
  }

  const toggleForm = () => {
    formVisibility ? setFormVisibility('') : setFormVisibility('form-invisible')
  }

  return {
    formVisibility,
    toggleForm,
    Toggle,
  }
}
