import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from '../../images/edit.png';

function MyBooksList({
  setSelectedAmountBooks,
  setOpenEdit,
  setTitle,
  setDescription,
  setAuthor,
  setSelectedMyBook,
}) {
  const myBooks = useSelector((state) => state.books.myBooks);

  useEffect(() => {
    setSelectedAmountBooks(0);
  }, []);

  const handleEditMyBook = (item) => {
    console.log(item);
    setOpenEdit(true);
    setTitle(item.title);
    setDescription(item.description);
    setAuthor(item.author);
    setSelectedMyBook(item._id);
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {myBooks.length ? (
        myBooks.map((item, index) => (
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
            <div
              onClick={() => handleEditMyBook(item)}
              className="add-icon shrink-0 sm:flex sm:flex-col sm:items-end cursor-pointer"
            >
              <img src={EditIcon} alt="edit" />
            </div>
          </li>
        ))
      ) : (
        <h2 className={'no-data'}>No data</h2>
      )}
    </ul>
  );
}

export default MyBooksList;
