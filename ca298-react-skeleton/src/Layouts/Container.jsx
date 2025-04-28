import { Outlet, Link } from 'react-router-dom';

export default function Container() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/books">All Books</Link> |{' '}
        <Link to="/genres">Genres</Link> |{' '}
        <Link to="/reviews">Reviews</Link>

      </nav>
      <div id="container">
        <Outlet />
      </div>
    </div>
  );
}
