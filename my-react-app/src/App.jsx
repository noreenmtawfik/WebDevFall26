import React, { useState } from "react";
import "./App.css";

// ==========================================
// CHILD COMPONENT: MovieCard
// Receives 'movie' object and 'onRemove' function via Props
// ==========================================
function MovieCard({ movie, onRemove }) {
  return (
    <div className="movie-card">
      <div className="movie-info">
        <div className="movie-header">
          <h3>{movie.title}</h3>
          {/* Displaying star rating using emojis */}
          <span className="movie-stars">{"⭐".repeat(movie.rating)}</span>
        </div>
        <p className="movie-comment">
          {movie.comment ? `"${movie.comment}"` : "No review added."}
        </p>
      </div>

      {/* Calls parent's remove function with this movie's unique ID */}
      <button className="delete-btn" onClick={() => onRemove(movie.id)}>
        Remove
      </button>
    </div>
  );
}

// ==========================================
// PARENT COMPONENT: App
// Manages state for the movies list and form inputs
// ==========================================
export default function App() {
  // 1. State for the list of watched movies
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      rating: 5,
      comment: "Mind-bending plot and Hans Zimmer's score is unmatched.",
    },
    {
      id: 2,
      title: "The Social Network",
      rating: 4,
      comment: "Fast-paced dialogue and great tech origin story.",
    },
  ]);

  // 2. States for the controlled form inputs
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Handler: Add a new movie to the list
  function handleAddMovie(e) {
    e.preventDefault(); // Prevent default form page reload

    // Validation: don't add if title is empty
    if (title.trim() === "") return;

    const newMovie = {
      id: Date.now(), // Unique ID based on timestamp
      title: title.trim(),
      rating: Number(rating),
      comment: comment.trim(),
    };

    // Update movies array immutably (spread existing movies + add new one)
    setMovies([newMovie, ...movies]);

    // Reset form fields after adding
    setTitle("");
    setRating(5);
    setComment("");
  }

  // Handler: Remove a movie by filtering out its ID
  function handleRemoveMovie(idToRemove) {
    const updatedMovies = movies.filter((movie) => movie.id !== idToRemove);
    setMovies(updatedMovies);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 My Movies Watch List</h1>
        <p>Watched Movies: {movies.length}</p>
      </header>

      {/* Form to add a new movie */}
      <form className="movie-form" onSubmit={handleAddMovie}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Movie title (e.g., Interstellar)..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            aria-label="Star Rating"
          >
            <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
            <option value={4}>4 Stars ⭐⭐⭐⭐</option>
            <option value={3}>3 Stars ⭐⭐⭐</option>
            <option value={2}>2 Stars ⭐⭐</option>
            <option value={1}>1 Star ⭐</option>
          </select>
        </div>

        <textarea
          rows="2"
          placeholder="Write a short comment review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit" className="add-btn">
          + Add to Watch List
        </button>
      </form>

      {/* Conditional Rendering: Show message if list is empty, otherwise map movies */}
      {movies.length === 0 ? (
        <p className="empty-state">No movies in your list yet. Add one above!</p>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={handleRemoveMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
}