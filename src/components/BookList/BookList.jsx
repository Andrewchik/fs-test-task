import React from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBooks, setMyBooks } from '../../redux/actions/books.action';
import { toast } from 'react-toastify';

import AddIcon from '../../images/addIcon.png';

import './BookList.scss';

function BookList({
  isTokenAvailable,
  setSelectedAmountBooks,
  selectedAmountBooks,
}) {
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  console.log(books);

  const handleAddToMyBook = (book) => {
    setSelectedAmountBooks(selectedAmountBooks + 1);

    axios
      .delete(`http://localhost:5000/api/books/${book.id}`)
      .then(() => {
        dispatch(removeFromBooks(book.id));

        toast.success('You have added a book', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });

        setTimeout(() => {
          axios
            .get('http://localhost:5000/api/books/my')
            .then(({ data }) => {
              dispatch(setMyBooks(data));
            })
            .catch((error) => {
              console.log(error);
            });
        }, 1200);
      })
      .catch((error) => {
        toast.error('Error added a book', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {books.length ? (
        books.map((item, index) => (
          <li
            key={index}
            className="flex justify-between gap-x-6 py-5 p-2 items-center"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://pngimg.com/uploads/book/book_PNG2111.png"
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {item.title}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {item.description}
                </p>
                <p className="text-sm leading-6 text-gray-900">{item.author}</p>
              </div>
            </div>
            {isTokenAvailable && (
              <div
                onClick={() => handleAddToMyBook(item)}
                className="add-icon shrink-0 sm:flex sm:flex-col sm:items-end cursor-pointer"
              >
                <img src={AddIcon} alt="add" />
              </div>
            )}
          </li>
        ))
      ) : (
        <h2 className={'no-data'}>
          {books === null ? 'Network Error' : 'No data'}
        </h2>
      )}
    </ul>
  );
}

export default BookList;
