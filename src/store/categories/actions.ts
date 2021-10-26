import { Dispatch } from '@reduxjs/toolkit';
import api, { statusCodes } from 'core/api/api.config';
import { Category } from 'models/category';
import { rootActions } from 'store/root';
import { categoriesActions } from '.';

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    let categories: Category[] = [];

    const sendRequest = async () => {
      const response = await api.get<Category[]>(`/organization/categories.json`);

      if (response.status !== statusCodes.ok) {
        throw new Error();
      }

      return response.data || [];
    };

    try {
      dispatch(categoriesActions.startFetchData());
      categories = await sendRequest();
    } catch (_) {
      dispatch(
        rootActions.setNotification({
          status: 'error',
          message: 'An error occured during the fetch of categories',
        }),
      );
    } finally {
      dispatch(categoriesActions.endFetchCategories(categories));
    }
  };
};
