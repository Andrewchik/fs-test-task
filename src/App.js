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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditBookModal from './components/modals/EditBookModal/EditBookModal';

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
  const [openEdit, setOpenEdit] = useState(false);
  const [openAuthModal, setOpenAuthMoadl] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAmountBooks, setSelectedAmountBooks] = useState(0);
  const [selectedMyBook, setSelectedMyBook] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const [isTokenAvailable, setTokenAvailable] = useState(
    !!localStorage.getItem('token')
  );

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

  const handleLogIn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        login: login,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);

        toast.success('Success', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });

        setTokenAvailable(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || 'Authentication failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.error(error.response?.data.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-full">
      <Header
        user={user}
        setOpen={setOpen}
        setOpenAuthModal={setOpenAuthMoadl}
        isTokenAvailable={isTokenAvailable}
        setTokenAvailable={setTokenAvailable}
        selectedAmountBooks={selectedAmountBooks}
      />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                <BookList
                  isTokenAvailable={isTokenAvailable}
                  selectedAmountBooks={selectedAmountBooks}
                  setSelectedAmountBooks={setSelectedAmountBooks}
                />
              }
            />
            <Route
              path="/my-books"
              element={
                <MyBooksList
                  setSelectedAmountBooks={setSelectedAmountBooks}
                  setOpenEdit={setOpenEdit}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setAuthor={setAuthor}
                  setSelectedMyBook={setSelectedMyBook}
                />
              }
            />
          </Routes>
        </div>
      </main>

      <AddBookModal
        open={open}
        setOpen={setOpen}
        setTitle={setTitle}
        title={title}
        setDescription={setDescription}
        description={description}
        setAuthor={setAuthor}
        author={author}
      />
      <EditBookModal
        open={openEdit}
        setOpen={setOpenEdit}
        setTitle={setTitle}
        title={title}
        setDescription={setDescription}
        description={description}
        setAuthor={setAuthor}
        author={author}
        selectedMyBook={selectedMyBook}
      />
      {openAuthModal && (
        <AuthModal
          handleLogIn={handleLogIn}
          setOpenAuthMoadl={setOpenAuthMoadl}
          setLogin={setLogin}
          setPassword={setPassword}
          login={login}
          password={password}
        />
      )}

      <ToastContainer />
    </div>
  );
}
