const validateRegisterInput = (username, password, confirmPassword, email) => {
  const errors = {}

  if (!username.trim()) {
    errors.username = 'Username cannot be empty'
  }

  if (!email.trim()) {
    errors.email = 'Email cannot be empty'
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Email is not structured correctly'
    }
  }
  if (password.trim() === '') {
    errors.password = 'Password cannot be empty'
  } else if (password.length <= 6) {
    errors.password = 'Length of password must be greater than 6'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

const validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username cannot be empty'
  }
  if (password.trim() === '') {
    errors.password = 'Password cannot be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

const validateItemInput = (itemDate, itemName, itemCategory, itemPrice) => {
  const errors = {}

  if (itemDate.trim() === '') {
    errors.itemDate = 'Item date cannot be empty'
  }
  if (itemName.trim() === '') {
    errors.itemName = 'Item name cannot be empty'
  }
  if (itemCategory.trim() === '') {
    errors.itemCategory = 'Item category cannot be empty'
  }
  if (itemPrice.price === '') {
    errors.itemPrice = 'Item price cannot be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateItemInput,
}
