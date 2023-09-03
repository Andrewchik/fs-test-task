import {
  BOOKS_LIST,
  ADD_TO_MY_BOOKS,
  REMOVE_FROM_BOOKS,
  MY_BOOKS,
} from '../actions/books.action';

const initialState = {
  books: [],
  myBooks: [],
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_LIST:
      return { ...state, books: action.payload };

    case REMOVE_FROM_BOOKS:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== action.payload),
      };

    case MY_BOOKS:
      return { ...state, myBooks: action.payload };

    case ADD_TO_MY_BOOKS:
      const bookToAdd = state.books.find((book) => book._id === action.payload);
      if (bookToAdd) {
        return {
          ...state,
          myBooks: [...state.myBooks, bookToAdd],
          books: state.books.filter((book) => book._id !== action.payload),
        };
      }
      return state;

    case REMOVE_FROM_BOOKS:
      const bookToRemove = state.myBooks.find(
        (book) => book._id === action.payload
      );
      if (bookToRemove) {
        return {
          ...state,
          myBooks: state.myBooks.filter((book) => book._id !== action.payload),
          books: [...state.books, bookToRemove],
        };
      }
      return state;

    default:
      return state;
  }
};

export default booksReducer;
