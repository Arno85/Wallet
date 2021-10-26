import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './state';
import { Notification } from 'models/notification';

const initialState: RootState = {
  notification: null,
};

const slice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<Notification | null>) {
      return {
        ...state,
        notification: action.payload,
      };
    },
  },
});

export const rootActions = slice.actions;

export default slice.reducer;
