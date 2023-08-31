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

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export default function App() {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);

  const isMyBooksPage = location.pathname === '/my-books';

  const navigation = [
    { name: 'Book list', href: '/', current: !isMyBooksPage },
    { name: 'My books', href: '/my-books', current: isMyBooksPage },
  ];

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ];

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/books')
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="min-h-full">
      <Header
        user={user}
        navigation={navigation}
        userNavigation={userNavigation}
        setOpen={setOpen}
      />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<BookList books={books} />} />
            <Route path="/my-books" element={<MyBooksList />} />
          </Routes>
        </div>
      </main>

      <AddBookModal open={open} setOpen={setOpen} />
    </div>
  );
}
