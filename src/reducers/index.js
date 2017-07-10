import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, addItem } from './items';

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  addItem
});