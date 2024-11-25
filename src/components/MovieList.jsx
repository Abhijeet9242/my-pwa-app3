import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation(); // Hook to get the current location

  const fetchMovies = () => {
    // Parse query string from the URL
    const queryParams = queryString.parse(location.search); // Correct usage
    const searchText = queryParams.searchText || "spider man"; // Fallback if searchText is not provided

    axios
      .get(`https://www.omdbapi.com/?apikey=ed6c64f7&s=${searchText}`)
      .then((response) => {
        if (response.data && response.data.Search) {
          console.log(response.data.Search, "Movies fetched");
          setMovies(response.data.Search); // Update state with movie data
        } else {
          console.error("No movies found");
          setMovies([]); // Clear the list if no movies found
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  // Re-run fetchMovies whenever the URL query string changes
  useEffect(() => {
    fetchMovies();
  }, [location.search]); // Dependency on location.search

  return (
    <div className="row">
    {movies.map((movie) => (
      <MovieCard key={movie.imdbID} movie={movie} />
    ))}
  </div>
  );
};

export default MovieList;
