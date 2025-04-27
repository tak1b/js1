import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000/api";

// helper to turn numeric score into label
function getScoreLabel(score) {
  switch (Number(score)) {
    case 1: return "Bad";
    case 2: return "OK";
    case 3: return "Good";
    default: return String(score);
  }
}

export default function UserReviewsPage() {
  useEffect(() => {
    document.title = "User Reviews";
  }, []);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState({ users: true, reviews: false });

  // fetch users
  useEffect(() => {
    fetch(`${API_BASE}/user/`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        if (data.length > 0) {
          setSelectedUser(data[0].id.toString());
        }
      })
      .finally(() => setLoading(l => ({ ...l, users: false })));
  }, []);

  // fetch reviews when selectedUser changes
  useEffect(() => {
    if (!selectedUser) return;
    setLoading(l => ({ ...l, reviews: true }));
    fetch(`${API_BASE}/review/?user=${selectedUser}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .finally(() => setLoading(l => ({ ...l, reviews: false })));
  }, [selectedUser]);

  if (loading.users || loading.reviews) {
    return <p>Loading…</p>;
  }

  return (
    <div>
      <h2>Select a User</h2>
      <select
        value={selectedUser}
        onChange={e => setSelectedUser(e.target.value)}
      >
        {users.map(u => (
          <option key={u.id} value={u.id}>
            {u.name || u.username}
          </option>
        ))}
      </select>

      {reviews.length === 0 ? (
        <p>This user hasn’t written any reviews yet.</p>
      ) : (
        reviews.map(rev => {
          const book = rev.book || {};
          const title = book.title || rev.book_title || "Untitled";
          const bookId = book.id || rev.book_id || "";
          const rawScore = rev.score ?? rev.review_score ?? rev.rating;
          const scoreLabel = getScoreLabel(rawScore);
          const text = rev.text ?? rev.review_text ?? rev.body ?? "";

          return (
            <div key={rev.id}>
              <h3>
                <Link to={`/books/${bookId}`}>{title}</Link>
              </h3>
              <p>
                <strong>Score:</strong> {scoreLabel}
              </p>
              <p>{text}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
