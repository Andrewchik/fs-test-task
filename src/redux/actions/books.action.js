export const BOOKS_LIST = 'BOOKS_LIST';
export const ADD_TO_MY_BOOKS = 'ADD_TO_MY_BOOKS';
export const REMOVE_FROM_BOOKS = 'REMOVE_FROM_BOOKS';

export const setBooksList = (data) => ({
  type: BOOKS_LIST,
  payload: data,
});

export const addToMyBooks = (bookId) => ({
  type: ADD_TO_MY_BOOKS,
  payload: bookId,
});
