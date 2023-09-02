import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import BookList from './components/BookList/BookList';
import MyBooksList from './components/MyBooksList/MyBooksList';
import Header from './components/Header/Header';
import AddBookModal from './components/modals/AddBookModal/AddBookModal';
import axios from 'axios';
import { setBooksList } from './redux/actions/books.action';
import { useDispatch, useSelector } from 'react-redux';
import AuthModal from './components/modals/AuthModal/AuthModal';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthMoadl] = useState(false);

  useEffect(() => {
    axios
      .get('https://test-sercer.onrender.com/api/books')
      .then(({ data }) => {
        dispatch(setBooksList(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <div className="min-h-full">
      <Header user={user} setOpen={setOpen} />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/my-books" element={<MyBooksList />} />
          </Routes>
        </div>
      </main>

      <AddBookModal open={open} setOpen={setOpen} />
      {openAuthModal && <AuthModal />}
    </div>
  );
}
