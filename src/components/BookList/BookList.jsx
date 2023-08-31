import React from 'react';
import './BookList.scss';

function BookList({ books }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {books.map((item, index) => {
        return (
          <li
            key={index}
            className="flex justify-between gap-x-6 py-5 hover:bg-gray-200 cursor-pointer p-2"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {item.title}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900"> {item.author}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default BookList;
