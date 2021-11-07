import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from 'models/transaction';
import { TransactionState } from './state';

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  isLoaded: false,
};

const slice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    startFetchData(state) {
      return {
        ...state,
        isLoading: true,
      };
    },
    endFetchTransactions(state, action: PayloadAction<Transaction[]>) {
      return {
        ...state,
        transactions: action.payload,
        isLoaded: true,
        isLoading: false,
      };
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      const transactions = [...state.transactions];
      transactions.unshift(action.payload);

      return {
        ...state,
        transactions,
      };
    },
    editTransaction(state, action: PayloadAction<Transaction>) {
      const transactions = [...state.transactions];
      const transactionIndex = transactions.findIndex((t) => t.id === action.payload.id);

      if (transactionIndex !== -1) {
        transactions[transactionIndex] = action.payload;
      }

      return {
        ...state,
        transactions,
      };
    },
    deleteTransaction(state, action: PayloadAction<string>) {
      const transactions = [...state.transactions];
      const transactionIndex = transactions.findIndex((t) => t.id === action.payload);

      if (transactionIndex !== -1) {
        transactions.splice(transactionIndex, 1);
      }

      return {
        ...state,
        transactions,
      };
    },
  },
});

export const transactionsActions = slice.actions;

export default slice.reducer;
