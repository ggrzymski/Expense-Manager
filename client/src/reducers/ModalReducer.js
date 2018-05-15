const initialState = {
  showExpenseModal: false,
  showUpdateModal: false
};

const showExpenseModalReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE_MODAL':
      return {
        ...state,
        showExpenseModal: action.toggleModalOn
      }
    case 'UPDATE_MODAL':
      return {
        ...state,
        showUpdateModal: action.toggleModalOn
      }
      default:
      return state;
  }
};

export default showExpenseModalReducer;