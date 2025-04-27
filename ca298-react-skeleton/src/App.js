import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from './Layouts/Container';
import FourOhFour from './Layouts/FourOhFour';
import HomePage from './Layouts/HomePage';
import BooksPage from './Layouts/BooksPage';
import GenresPage from './Layouts/GenresPage';
import BookDetails from './Layouts/BookDetails';
import UserPage from './Layouts/UserPage';
import UserReviews from './Layouts/UserReviews'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<HomePage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="books/:id" element={<BookDetails />} />
          <Route path="genres" element={<GenresPage />} />
          <Route path="reviews" element={<UserReviews />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
