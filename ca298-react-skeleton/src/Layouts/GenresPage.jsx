import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE =  "http://127.0.0.1:8000/api";


function fetchGenres() {
  return fetch(`${API_BASE}/genre/`).then((res) => res.json());
}

function fetchBooksByGenre(genre) {
  return fetch(`${API_BASE}/book/?genre=${genre}`).then((res) => res.json());
}

export default function GenresPage() {

  useEffect(() => {
    document.title = "Genres";
  }, []);

  // state
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);

  useEffect(() => {
    setIsLoadingGenres(true);
    fetchGenres()
      .then((data) => {
        setGenres(data);
        if (data.length > 0) {
          setSelectedGenre(data[0].name);
        }
      })
      .catch((err) => console.error("Error fetching genres:", err))
      .finally(() => setIsLoadingGenres(false));
  }, []);

  useEffect(() => {
    if (!selectedGenre) return;
    setIsLoadingBooks(true);
    fetchBooksByGenre(selectedGenre)
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err))
      .finally(() => setIsLoadingBooks(false));
  }, [selectedGenre]);

  if (isLoadingGenres || isLoadingBooks) {
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
        maxWidth: "700px",
        margin: "2em auto",
        padding: "1em",
      }}
    >
      <h2>Select a Genre</h2>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={{ padding: "0.5em", fontSize: "1em", marginTop: "0.5em" }}
      >
        {genres.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "2em" }}>
        {books.length === 0 ? (
          <p>No books found for this genre.</p>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              style={{
                marginBottom: "2.5em",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.3em" }}>
                <Link
                  to={`/books/${book.id}`}
                  style={{ color: "#06c", textDecoration: "underline" }}
                >
                  {book.title}
                </Link>
              </h3>
              <p style={{ margin: "0.5em 0", fontWeight: "bold" }}>
                Book ID: {book.id}
              </p>
              <p style={{ margin: "0.25em 0", fontStyle: "italic" }}>
                {book.synopsis}
              </p>
              <p style={{ margin: "0.25em 0" }}>
                <strong>Author:</strong>{" "}
                {book.author.first_name} {book.author.last_name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
