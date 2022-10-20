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
      <div onClick={() => toggleForm()} className="flex items-center w-full justify-between">
        <h2 className="page-container-header-toggle">{formName}</h2>
        {formVisibility ? (
          <FaPlus className="text-headingColor" />
        ) : (
          <FaMinus className="text-headingColor" />
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
