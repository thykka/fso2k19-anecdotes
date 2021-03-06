const initialState = {
  message: '',
  visible: false,
  id: 0
};

let notificationId = 0;

export const flashNotification = (message, duration = 5) => {
  const id = notificationId++;
  return dispatch => {
    dispatch(showNotification(message, id));
    setTimeout(() => {
      dispatch(hideNotification(id));
    }, duration * 1000);
  };
};

const showNotification = (message, id) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { message, visible: true, id }
  }
};

const hideNotification = (id) => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: { visible: false, id }
  }
};

const setNotification = (state, message, id) => {
  return {
    ...state,
    message: message || '',
    visible: !!message,
    id
  }
};

const reducer = (state = initialState, action) => {
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
