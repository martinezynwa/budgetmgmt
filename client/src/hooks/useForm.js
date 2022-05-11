import { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import '../styles/components/Toggle.css'

export const useForm = () => {
  const [formVisibility, setFormVisibility] = useState('formNotVisible')

  const Toggle = ({ formVisibility, toggleForm, formName }) => {
    return (
      <div className="toggleBar">
        <button className="toggleButton" onClick={() => toggleForm()}>
          {formName}
        </button>
        {formVisibility ? (
          <FaAngleDown className="toggleArrow" />
        ) : (
          <FaAngleUp className="toggleArrow" />
        )}
      </div>
    )
  }

  const toggleForm = () => {
    formVisibility ? setFormVisibility('') : setFormVisibility('formNotVisible')
  }

  return {
    formVisibility,
    toggleForm,
    Toggle,
  }
}
