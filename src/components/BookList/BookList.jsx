import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.scss';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('/api/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="book-list">
      <h2 className="font-bold underline">Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
