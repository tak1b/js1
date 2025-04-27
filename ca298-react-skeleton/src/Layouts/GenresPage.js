import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GenresPage() {
  useEffect(() => {
    document.title = "Exam";
  }, []);

  const [selectedGenre, setSelectedGenre] = useState("philosophical");
  const [genres, setGenres] = useState([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);
  const [books, setBooks] = useState([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);

  // fetch genres
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/genre/")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
        setIsLoadingGenres(false);
      })
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  // fetch books whenever selectedGenre changes
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/book/?genre=${selectedGenre}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setIsLoadingBooks(false);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, [selectedGenre]);

  if (isLoadingGenres || isLoadingBooks) {
    return <p>Loading…</p>;
  }

  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <h2>Select a Genre</h2>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        {genres.map((genre) => (
          <option key={genre.id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "1em" }}>
        {books.map((book) => (
          <div key={book.id} style={{ marginBottom: "1.5em" }}>
            <p>
              <strong>Book ID:</strong> {book.id}
            </p>
            <p>
              <strong>Title:</strong> {book.title}
            </p>
            <p>
              <strong>Synopsis:</strong> {book.synopsis}
            </p>
            <p>
              <strong>Author:</strong>{" "}
              {book.author.first_name} {book.author.last_name}
            </p>
            <Link to={`/books/${book.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
