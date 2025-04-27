import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/book/')
      .then(res => res.json())
      .then(setBooks)
      .catch(console.error);
  }, []);

  if (books.length === 0) return <p>Loading books…</p>;

  return (
    <div>
      <h2>All Books</h2>
      <ul>
        {books.map(b => (
          <li key={b.id}>
            <Link to={`/books/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
