import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root/index';
import categoriesReducer from './categories/index';
import transactionsReducer from './transactions/index';

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    rootReducer,
    categoriesReducer,
    transactionsReducer,
  },
});

export default store;
