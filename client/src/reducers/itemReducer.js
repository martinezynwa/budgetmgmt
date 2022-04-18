const itemReducer = (state, action) => {
  switch (action.type) {
    case 'ALL':
      return {
        ...state,
        items: action.items,
      }
    case 'FILTERED':
      let { username, items } = action.data
      if (!username) {
        return { items }
      }
      items = action.data.items.filter(
        item => item.createdBy.username === username,
      )
      return { items }
    default:
      return state
  }
}

export default itemReducer
