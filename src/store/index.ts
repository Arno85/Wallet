import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root/index';
import categoriesReducer from './categories/index';

const store = configureStore({
  reducer: {
    rootReducer,
    categoriesReducer,
  },
});

export default store;
