import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from 'models/category';
import { CategoryState } from './state';

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  isLoaded: false,
};

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    startFetchData(state) {
      return {
        ...state,
        isLoading: true,
      };
    },
    endFetchCategories(state, action: PayloadAction<Category[]>) {
      return {
        ...state,
        categories: action.payload,
        isLoaded: true,
        isLoading: false,
      };
    },
    addCategory(state, action: PayloadAction<Category>) {
      const categories = [...state.categories];
      categories.unshift(action.payload);

      return {
        ...state,
        categories,
      };
    },
    editCategory(state, action: PayloadAction<Category>) {
      const categories = [...state.categories];
      const categoryIndex = categories.findIndex((c) => c.id === action.payload.id);

      if (categoryIndex !== -1) {
        categories[categoryIndex] = action.payload;
      }

      return {
        ...state,
        categories,
      };
    },
    deleteCategory(state, action: PayloadAction<string>) {
      const categories = [...state.categories];
      const categoryIndex = categories.findIndex((c) => c.id === action.payload);

      if (categoryIndex !== -1) {
        categories.splice(categoryIndex, 1);
      }

      return {
        ...state,
        categories,
      };
    },
  },
});

export const categoriesActions = slice.actions;

export default slice.reducer;
