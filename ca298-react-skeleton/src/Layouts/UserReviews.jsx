import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE =  "http://127.0.0.1:8000/api";

function getScoreLabel(score) {
  switch (Number(score)) {
    case 1:
      return "Bad";
    case 2:
      return "OK";
    case 3:
      return "Good";
    default:
      return String(score);
  }
}

export default function UserReviewsPage() {

  useEffect(() => {
    document.title = "User Reviews";
  }, []);

  // state
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    setIsLoadingUsers(true);
    fetch(`${API_BASE}/user/`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        if (data.length > 0) {
          setSelectedUser(data[0].id.toString());
        }
      })
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setIsLoadingUsers(false));
  }, []);

  // fetch reviews whenever selectedUser changes
  useEffect(() => {
    if (!selectedUser) return;

    setIsLoadingReviews(true);
    fetch(`${API_BASE}/review/?user=${selectedUser}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => console.error("Error fetching reviews:", err))
      .finally(() => setIsLoadingReviews(false));
  }, [selectedUser]);

  // loading state
  if (isLoadingUsers || isLoadingReviews) {
    return (
      <p style={{ textAlign: "center", marginTop: "2em" }}>
        Loading…
      </p>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "600px",
        margin: "2em auto",
        padding: "1em",
      }}
    >
      <h2>Select a User</h2>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        style={{ padding: "0.5em", fontSize: "1em" }}
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name || u.username}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "2em", textAlign: "center" }}>
        {reviews.length === 0 ? (
          <p>This user hasn’t written any reviews yet.</p>
        ) : (
          reviews.map((rev) => {
            const book = rev.book || {};
            const title = book.title || rev.book_title || "Untitled";
            const bookId = book.id || rev.book_id || "";
            const rawScore = rev.score ?? rev.review_score ?? rev.rating;
            const scoreLabel = getScoreLabel(rawScore);
            const text = rev.text ?? rev.review_text ?? rev.body ?? "";

            return (
              <div
                key={rev.id}
                style={{
                  marginBottom: "2em",
                  textAlign: "center",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "1.25em" }}>
                  <Link
                    to={`/books/${bookId}`}
                    style={{ color: "#06c", textDecoration: "underline" }}
                  >
                    {title}
                  </Link>
                </h3>

                <p style={{ margin: "0.25em 0", fontWeight: "bold" }}>
                  Book ID: {bookId}
                </p>

                <p style={{ margin: "0.5em 0", fontWeight: "bold" }}>
                  Score: {scoreLabel}
                </p>

                <p style={{ margin: 0 }}>{text}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
