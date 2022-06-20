const itemReducer = (state, action) => {
  switch (action.type) {
    case 'CURRENT_MONTH':
      return {
        ...state,
        items: action.items,
      }
    case 'BY_USER':
      let { username } = action.data
      let items = action.data.data.getCurrentMonthByUser

      if (!username) {
        return { items }
      }

      items = items.filter(item => item.createdBy.username === username)

      return {
        ...state,
        items: items,
      }
    default:
      return state
  }
}

export default itemReducer
