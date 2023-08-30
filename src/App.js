import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import BookList from './components/BookList/BookList';
import MyBooksList from './components/MyBooksList/MyBooksList'; // Import your MyBooksList component
import Header from './components/Header/Header';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export default function App() {
  const location = useLocation();
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

  return (
    <div className="min-h-full">
      <Header
        user={user}
        navigation={navigation}
        userNavigation={userNavigation}
      />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/my-books" element={<MyBooksList />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
