import { Dispatch } from '@reduxjs/toolkit';
import api, { statusCodes } from 'core/api/api.config';
import { Transaction } from 'models/transaction';
import { rootActions } from 'store/root';
import { transactionsActions } from '.';

export const fetchTransactions = () => {
  return async (dispatch: Dispatch) => {
    let transactions: Transaction[] = [];

    const sendRequest = async () => {
      const response = await api.get(`transactions.json`);

      if (response.status !== statusCodes.ok) {
        throw new Error();
      }

      if (!response.data) {
        return [];
      }

      const transactionData = Object.keys(response.data).map((k) => {
        const data = response.data[k];
        return {
          id: k,
          description: data.description,
          categoryId: data.categoryId,
          date: data.date,
          amount: data.amount,
        } as Transaction;
      });

      return transactionData.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
    };

    try {
      dispatch(transactionsActions.startFetchData());
      transactions = await sendRequest();
    } catch (_) {
      dispatch(
        rootActions.setNotification({
          status: 'error',
          message: 'An error occured during the fetch of transactions',
        }),
      );
    } finally {
      dispatch(transactionsActions.endFetchTransactions(transactions));
    }
  };
};

export const addTransaction = (transaction: Partial<Transaction>) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const response = await api.post<{ name: string }>(`transactions.json`, transaction);

      if (response.status !== statusCodes.ok) {
        throw new Error();
      }

      return response.data.name;
    };

    try {
      const transactionId = await sendRequest();
      const transactionCreated = { ...transaction, id: transactionId } as Transaction;

      dispatch(transactionsActions.addTransaction(transactionCreated));
      dispatch(
        rootActions.setNotification({
          status: 'success',
          message: `Transaction ${transaction.description} created!`,
        }),
      );
    } catch (_) {
      dispatch(
        rootActions.setNotification({
          status: 'error',
          message: `An error occured during the creation of the transaction ${transaction.description}`,
        }),
      );
    }
  };
};

export const editTransaction = (transaction: Partial<Transaction>, transactionId: string) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const response = await api.put(`transactions/${transactionId}.json`, transaction);

      if (response.status !== statusCodes.ok) {
        throw new Error();
      }

      return response.data;
    };

    try {
      const transactionData = await sendRequest();

      dispatch(transactionsActions.editTransaction({ ...transactionData, id: transactionId }));
      dispatch(
        rootActions.setNotification({
          status: 'success',
          message: `Transaction ${transaction.description} edited!`,
        }),
      );
    } catch (_) {
      dispatch(
        rootActions.setNotification({
          status: 'error',
          message: `An error occured during the edition of the transaction ${transaction.description}`,
        }),
      );
    }
  };
};

export const deleteTransaction = (transaction: Transaction) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const response = await api.delete(`transactions/${transaction.id}.json`);

      if (response.status !== statusCodes.ok) {
        throw new Error();
      }

      return response.data;
    };

    try {
      await sendRequest();

      dispatch(transactionsActions.deleteTransaction(transaction.id));
      dispatch(
        rootActions.setNotification({
          status: 'success',
          message: `Transaction ${transaction.description} deleted!`,
        }),
      );
    } catch (_) {
      dispatch(
        rootActions.setNotification({
          status: 'error',
          message: `An error occured during the deletion of the transaction ${transaction.description}`,
        }),
      );
    }
  };
};
