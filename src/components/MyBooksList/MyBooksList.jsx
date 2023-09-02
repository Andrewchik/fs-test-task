import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function MyBooksList({ setSelectedAmountBooks }) {
  const { myBooks } = useSelector((state) => state.books);

  useEffect(() => {
    setSelectedAmountBooks(0);
  }, []);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {myBooks.map((item, index) => {
        return (
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
          </li>
        );
      })}
    </ul>
  );
}

export default MyBooksList;
