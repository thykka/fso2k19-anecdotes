const initialState = {
  message: '',
  visible: false,
  id: 0
};

let notificationId = 0;

export const showNotification = (message, id) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { message, visible: true, id }
  }
};

export const hideNotification = (id) => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: { message: '', visible: false, id }
  }
};

export const flashNotification = (dispatch, message) => {
  const id = notificationId++;
  dispatch(showNotification(message, id));
  setTimeout(() => {
    dispatch(hideNotification(id));
  }, 5000);
}

const setNotification = (state, message, id) => {
  return {
    ...state,
    message: message || '',
    visible: !!message,
    id
  }
};

const reducer = (state = initialState, action) => {
  console.log(action.type, action.data);
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return setNotification(state, action.data.message, action.data.id);
    case 'HIDE_NOTIFICATION':
      if(state.id !== action.data.id) return state;
      return setNotification(state, false, action.data.id);
    default:
  }
  return state;
};

export default reducer;
