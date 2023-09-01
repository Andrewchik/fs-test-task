import { combineReducers } from 'redux';
import booksReducer from './redux/reducers/books.reducer';

const rootReducer = combineReducers({
  books: booksReducer,
});

export default rootReducer;
