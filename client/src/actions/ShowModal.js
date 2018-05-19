// Action Types are set as constants

const ADD_EXPENSE_MODAL = 'ADD_EXPENSE_MODAL';
const UPDATE_MODAL = 'UPDATE_MODAL';
const UPDATE_TABLE = 'UPDATE_TABLE';


export const expenseModal = (toggleModalOn) => ({
  type: ADD_EXPENSE_MODAL,
  toggleModalOn
}); 

export const updateModal = (toggleModalOn, uuid) => ({
  type: UPDATE_MODAL,
  toggleModalOn,
  uuid
});

export const updateTable = (refreshDisplayStatus) => ({
  type: UPDATE_TABLE,
  refreshDisplayStatus
});