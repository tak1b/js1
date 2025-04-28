import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div
      style={{
        textAlign: 'center',
        maxWidth: '600px',
        margin: '2em auto',
        padding: '1em',
      }}
    >
      <h1>Welcome to the Book Review App</h1>
      <p>
        <Link to="/books" style={{ textDecoration: 'underline', color: '#06c' }}>
          View All Books
        </Link>
      </p>
      <p>
        <Link to="/genres" style={{ textDecoration: 'underline', color: '#06c' }}>
          Browse by Genre
        </Link>
      </p>
    </div>
  );
}
