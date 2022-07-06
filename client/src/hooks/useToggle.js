import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import '../styles/components/Toggle.css'

/*
used for every input/search form
hiding the form by default
on clicking displaying the form of specific component
*/

export const useToggle = () => {
  const [formVisibility, setFormVisibility] = useState('form-invisible')

  //formVisibility false by default
  //formName for header of the toggle for form
  const Toggle = ({ formVisibility, toggleForm, formName }) => {
    return (
      <div onClick={() => toggleForm()} className="toggle-bar">
        <div className="toggle-name">{formName}</div>
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
