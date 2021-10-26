import { Dispatch } from '@reduxjs/toolkit';
import { rootActions } from './index';

export const resetNotification = () => {
  return async (dispatch: Dispatch) => {
    dispatch(rootActions.setNotification(null));
  };
};
