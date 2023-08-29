import React from 'react';
import BookList from './components/BookList/BookList';
import BookForm from './components/BookForm/BookForm';
import './App.css';

function App() {
  return (
      <div className="App">
        <h1>Book Collection</h1>
        <BookList />
        <BookForm />
      </div>
  );
}

export default App;
