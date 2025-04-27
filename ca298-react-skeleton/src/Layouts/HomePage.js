import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Book Review App</h1>
      <p><Link to="/books">View All Books</Link></p>
      <p><Link to="/genres">Browse by Genre</Link></p>
    </div>
  );
}
