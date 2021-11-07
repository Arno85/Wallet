import { RootState } from './root/state';
import { CategoryState } from './categories/state';
import { TransactionState } from './transactions/state';

export interface AppStore {
  rootReducer: RootState;
  categoriesReducer: CategoryState;
  transactionsReducer: TransactionState;
}
