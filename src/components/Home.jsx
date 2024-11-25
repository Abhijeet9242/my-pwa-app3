import React, { useEffect, useState } from 'react';
import MovieCard from "./MovieCard";

const Home = () => {
  const [movieData, setMovieData] = useState([]); // Initialize as an empty array
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      const apiKey = process.env.REACT_APP_OMDB_API_KEY; 
      const searchText = isOffline ? 'avenger' : 'thor';
      const url = `https://www.omdbapi.com?apikey=${apiKey}&s=${searchText}`;
  
      try {
        const cachedResponse = await caches.match(url);
        if (cachedResponse) {
          const cachedData = await cachedResponse.json();
          setMovieData(cachedData.Search || []);
          console.log('Loaded from cache:', cachedData);
        } else {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setMovieData(data.Search || []);
  
          if (data.Search) {
            const cache = await caches.open('omdb-api-cache');
            cache.put(url, response.clone());
            console.log('Cached data:', data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchMovieData();
  }, [isOffline]);
  
  return (
    <div className='row'>
      {movieData.length > 0 ? (
        movieData.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))
      ) : (
        <p>No movies found</p> // Display a message if no data is available
      )}
    </div>
  );
};

export default Home;
