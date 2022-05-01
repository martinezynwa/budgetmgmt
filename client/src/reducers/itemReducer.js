const itemReducer = (state, action) => {
  switch (action.type) {
    case 'ALL':
      return {
        ...state,
        items: action.items,
      }
    case 'ALL_ITEMS':
      let { allItems, selectedMonth } = action.data

      allItems = action.data.allItems.filter(
        item => item.itemDate.substring(0, 7) === selectedMonth,
      )
      return {
        ...state,
        items: allItems,
      }
    case 'FILTERED':
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
