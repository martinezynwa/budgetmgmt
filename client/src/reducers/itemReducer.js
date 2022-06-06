const itemReducer = (state, action) => {
  switch (action.type) {
    case 'CURRENT_MONTH':
      return {
        ...state,
        items: action.items,
      }
    case 'BY_USER':
      let { username, items } = action.data

      if (!username) {
        return { items }
      }
      items = action.data.items.filter(
        item => item.createdBy.username === username,
      )
      return {
        ...state,
        items: items,
      }
    default:
      return state
  }
}

export default itemReducer
