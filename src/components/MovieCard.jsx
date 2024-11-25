import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const MovieCard = ({movie}) => {
// const[movie,setMovie] = useState({
//     "Title": "Iron Man",
//     "Year": "2008",
//     "imdbID": "tt0371746",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
//     },)

    // const st = {width:"250px"}

    const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the MovieDetails page with imdbID in the query string
    navigate(`/details?imdbID=${movie.imdbID}`);
  };


  return (
   <div className='col-md-3'  onClick={handleClick} style={{ cursor: "pointer"}}>
     <div className="card">
  <img src={movie.Poster} alt={movie.Title}/>
  <div className="card-body">
   <h5 className='card-title'>{movie.Title}</h5>
   <p className='card-text'>{movie.Year}</p>
  </div>
</div>
   </div>
  )
}

export default MovieCard