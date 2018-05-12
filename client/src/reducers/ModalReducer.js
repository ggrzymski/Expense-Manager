const initialState = {
  showModal: false
};

const showModalReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: action.toggleModalOn
      }
    case 'HIDE_MODAL':
      return {
        ...state,
        showModal: action.toggleModalOn
      }
      default:
      return state;
  }
};

export default showModalReducer;