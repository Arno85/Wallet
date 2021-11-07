import { Dispatch } from '@reduxjs/toolkit';
import api, { statusCodes } from 'core/api/api.config';
import { Category } from 'models/category';
import { rootActions } from 'store/root';
import { categoriesActions } from '.';

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    let categories: Category[] = [];

    const sendRequest = async () => {
      const response = await api.get(`categories.json`);

      if (response.status !== statusCodes.ok) {
        throw new Error();
      }

      if (!response.data) {
        return [];
      }

      const categoryData = Object.keys(response.data).map((k) => {
        const data = response.data[k];
        return {
          id: k,
          name: data.name,
          type: data.type,
        } as Category;
      });

      return categoryData.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
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

export const addCategory = (category: Partial<Category>) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const response = await api.post<{ name: string }>(`categories.json`, category);

      if (response.status !== statusCodes.ok) {
        throw new Error();
      }

      return response.data.name;
    };

    try {
      const categoryId = await sendRequest();
      const categoryCreated = { ...category, id: categoryId } as Category;

      dispatch(categoriesActions.addCategory(categoryCreated));
      dispatch(
        rootActions.setNotification({
          status: 'success',
          message: `Category ${category.name} created!`,
        }),
      );
    } catch (_) {
      dispatch(
        rootActions.setNotification({
          status: 'error',
          message: `An error occured during the creation of the category ${category.name}`,
        }),
      );
    }
  };
};

export const editCategory = (category: Partial<Category>, categoryId: string) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const response = await api.put(`categories/${categoryId}.json`, category);

      if (response.status !== statusCodes.ok) {
        throw new Error();
      }

      return response.data;
    };

    try {
      const categoryData = await sendRequest();

      dispatch(categoriesActions.editCategory({ ...categoryData, id: categoryId }));
      dispatch(
        rootActions.setNotification({
          status: 'success',
          message: `Category ${category.name} edited!`,
        }),
      );
    } catch (_) {
      dispatch(
        rootActions.setNotification({
          status: 'error',
          message: `An error occured during the edition of the category ${category.name}`,
        }),
      );
    }
  };
};

export const deleteCategory = (category: Category) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const response = await api.delete(`categories/${category.id}.json`);

      if (response.status !== statusCodes.ok) {
        throw new Error();
      }

      return response.data;
    };

    try {
      await sendRequest();

      dispatch(categoriesActions.deleteCategory(category.id));
      dispatch(
        rootActions.setNotification({
          status: 'success',
          message: `Category ${category.name} deleted!`,
        }),
      );
    } catch (_) {
      dispatch(
        rootActions.setNotification({
          status: 'error',
          message: `An error occured during the deletion of the category ${category.name}`,
        }),
      );
    }
  };
};
