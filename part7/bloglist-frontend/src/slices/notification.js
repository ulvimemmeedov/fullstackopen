import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification: (_state, action) => action.payload,
    removeNotification: () => null,
  },
});

let timeoutId;
export const showTimedNotification = (content, error = false, timeout = 5) => {
  return (dispatch) => {
    clearTimeout(timeoutId);
    dispatch(
      showNotification({
        message: content,
        type: !error ? 'success' : 'error',
      })
    );
    timeoutId = setTimeout(
      () => dispatch(removeNotification()),
      timeout * 1000
    );
  };
};

export const { showNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
