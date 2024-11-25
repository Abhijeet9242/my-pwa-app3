import React, { useEffect, useState } from 'react';
import MovieCard from "./MovieCard";

const Home = () => {

  const [movieData, setMovieData] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check if the user is offline
    setIsOffline(!navigator.onLine);

    // Define the search text based on online or offline status
    const searchText = isOffline ? 'avenger' : 'thor';  // Use "Spiderman" for offline and "Thor" for online

    // Fetch movie data for either "Spiderman" or "Thor"
    const fetchMovieData = async () => {
      const apiKey = 'ed6c64f7';  // Replace with your OMDB API Key
      const url = `http://www.omdbapi.com?apikey=${apiKey}&s=${searchText}`;

      try {
        // First, check if the response is available in the cache
        const cachedResponse = await caches.match(url);
        if (cachedResponse) {
          const cachedData = await cachedResponse.json();
          setMovieData(cachedData);
        } else {
          // If not available in cache, fetch from OMDB API
          const response = await fetch(url);
          const data = await response.json();
          setMovieData(data);

          // Cache the response for offline access
          if (response.ok) {
            const cache = await caches.open('omdb-api-cache');
            cache.put(url, response);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchMovieData();
  }, [isOffline]);  // Re-run the effect when the online/offline status changes



  return (
    <div className='row'>
    {movieData.map((movie) => (
      <MovieCard key={movie.imdbID} movie={movieData} />
    ))}
    </div>
  )
}

export default Home