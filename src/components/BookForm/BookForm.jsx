import React, { useState } from 'react';
import axios from 'axios';

import './BookForm.scss';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make an API call to add the book
    axios
      .post('/api/books', { title, author })
      .then((response) => {
        console.log('Book added:', response.data);
        // Clear form inputs
        setTitle('');
        setAuthor('');
      })
      .catch((error) => console.error('Error adding book:', error));
  };

  return (
    <div className="book-form">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default BookForm;
