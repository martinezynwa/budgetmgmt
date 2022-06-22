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
  if (itemPrice === '') {
    errors.itemPrice = 'Item price cannot be empty'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

const validateCategoryInput = (categoryName, importance) => {
  const errors = {}
  if (!categoryName.trim()) {
    errors.categoryName = 'Category name cannot be empty'
  }
  if (Number(importance) >= 6 || Number(importance) <= 0) {
    errors.importance = 'Input between 1-5'
  }
  if (!importance) {
    errors.importance = 'Importance cannot be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

module.exports = {
  validateItemInput,
  validateCategoryInput,
}
