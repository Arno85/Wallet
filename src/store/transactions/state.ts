import { Transaction } from 'models/transaction';
import { BaseState } from 'store/baseState';

export interface TransactionState extends BaseState {
  transactions: Transaction[];
}
