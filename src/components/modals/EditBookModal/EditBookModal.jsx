import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setMyBooks } from '../../../redux/actions/books.action';

export default function EditBookModal({
  open,
  setOpen,
  setTitle,
  title,
  setDescription,
  description,
  setAuthor,
  author,
  selectedMyBook,
}) {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  const handleEditMyBook = (updatedData) => {
    return axios
      .put(`http://localhost:5000/api/books/${selectedMyBook}`, updatedData)
      .then((response) => {
        toast.success('Book updated', {
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
        }, 1300);

        setOpen(false);

        return response.data;
      })
      .catch((error) => {
        console.error('Error updating book:', error);
        toast.error('Error updating book:', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="items-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="mt-2">
                        <form className="space-y-6" action="#" method="POST">
                          <div>
                            <label
                              htmlFor="text"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Title
                            </label>
                            <div className="mt-2">
                              <input
                                id="text"
                                name="text"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Description
                              </label>
                            </div>
                            <div className="mt-2">
                              <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="text"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Author
                            </label>
                            <div className="mt-2">
                              <input
                                id="text"
                                name="text"
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={() =>
                      handleEditMyBook({
                        title,
                        description,
                        author,
                      })
                    }
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
