const ADD_EXPENSE_MODAL = 'ADD_EXPENSE_MODAL';
const UPDATE_MODAL = 'UPDATE_MODAL';


export const expenseModal = (toggleModalOn) => ({
  type: ADD_EXPENSE_MODAL,
  toggleModalOn
}); 

export const updateModal = (toggleModalOn) => ({
  type: UPDATE_MODAL,
  toggleModalOn
});