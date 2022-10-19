import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

/*
used for every input/search form
hiding the form by default
on clicking displaying the form of specific component
*/

export const useToggle = () => {
  const [formVisibility, setFormVisibility] = useState('hidden ')

  //formVisibility false by default
  //formName for header of the toggle for form
  const Toggle = ({ formVisibility, toggleForm, formName }) => {
    return (
      <div onClick={() => toggleForm()} className="flex items-center w-full justify-between sm:pl-1">
        <p className="text-toggle font-semibold">{formName}</p>
        {formVisibility ? (
          <FaPlus className="toggle-sign" />
        ) : (
          <FaMinus className="toggle-sign" />
        )}
      </div>
    )
  }

  const toggleForm = () => {
    formVisibility ? setFormVisibility('') : setFormVisibility('hidden ')
  }

  return {
    formVisibility,
    toggleForm,
    Toggle,
  }
}
