import { Category } from 'models/category';
import { BaseState } from 'store/baseState';

export interface CategoryState extends BaseState {
  categories: Category[];
}
