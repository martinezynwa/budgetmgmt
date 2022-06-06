import { useState } from 'react'

export const useActiveButton = () => {
  const [activeButton, setActiveButton] = useState()

  const handleActiveButton = id => {
    setActiveButton(id)
  }

  return {
    activeButton,
    handleActiveButton,
  }
}
