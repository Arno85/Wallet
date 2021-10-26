import { RootState } from './root/state';
import { CategoryState } from './categories/state';

export interface AppStore {
  rootReducer: RootState;
  categoriesReducer: CategoryState;
}
