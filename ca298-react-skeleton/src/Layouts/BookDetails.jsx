import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  const pathValues = window.location.pathname.split("/");
  const pathNumber   = pathValues[2];

  console.log(pathNumber);


  fetch(`http://127.0.0.1:8000/api/book/${pathNumber}/`)
  .then(res => { 
    if (!res.ok) throw new Error(res.statusText); 
    return res.json(); 
  })
  .then(data => {



    setBook(data);
  })
  .catch(console.error);

  
  if (!book) return <p>Loading book…</p>;

  return (
    <div>
      <h2>Title: {book.title}</h2>
      <p>Synopsis: {book.synopsis}</p>


      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map(r => (
          <div key={r.id}>
            <p>{r.review_text}</p>
            <p>Score: {r.review_score}</p>
            <Link to={`/user/${r.user}`}>By User {r.user}</Link>
          </div>
        ))
      )}
    </div>
  );
}