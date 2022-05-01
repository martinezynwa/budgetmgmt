const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'ALL':
      return {
        ...state,
        categories: action.categories,
      }
    default:
      return state
  }
}

export default categoryReducer
