import { BOOKS_LIST } from '../actions/books.action';

const initialState = {
  books: [],
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_LIST:
      return { ...state, books: action.payload };

    default:
      return state;
  }
};

export default booksReducer;
