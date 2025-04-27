mport { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/${id}/`)
      .then(res => { if (!res.ok) throw new Error(res.statusText); return res.json(); })
      .then(data => setUser(data))
      .catch(console.error);

    fetch(`http://127.0.0.1:8000/api/review/?user=${id}`)
      .then(res => { if (!res.ok) throw new Error(res.statusText); return res.json(); })
      .then(data => setReviews(data))
      .catch(console.error);
  }, [id]);

  if (!user) return <p>Loading user…</p>;

  return (
    <div>
      <h2>{user.username}</h2>

      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map(r => (
          <div key={r.id}>
            <p>{r.review_text}</p>
            <p>Score: {r.review_score}</p>
            <Link to={`/books/${r.book}`}>View Book</Link>
          </div>
        ))
      )}
    </div>
  );
}
