import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";

const MovieDetails = () => {
    const navigate = useNavigate();

  const [movieDetails, setMovieDetails] = useState(null); // State to store movie details
  const location = useLocation();

  const fetchMovieDetails = () => {
    // Parse the query string to get `imdbID`
    const queryParams = queryString.parse(location.search);
    const imdbID = queryParams.imdbID;

    if (!imdbID) {
      console.error("No imdbID found in the URL.");
      return;
    }

    // Fetch movie details by imdbID
    axios
      .get(`https://www.omdbapi.com/?apikey=ed6c64f7&i=${imdbID}`)
      .then((response) => {
        if (response.data) {
          console.log("Movie details fetched:", response.data);
          setMovieDetails(response.data); // Update state with movie details
        } else {
          console.error("No details found for the movie.");
        }
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [location.search]); // Trigger when the URL query changes

  const handleBack = () => {
    navigate(-1); // Go to the previous page
  };

  return (
    <div className="row">
      {/* Check if movieDetails exists */}
      {movieDetails ? (
        <>
          <div className="col-md-4">
            <img
              src={movieDetails.Poster}
              className="img img-thumbnail"
              alt={movieDetails.Title}
            />
          </div>
          <div className="col-md-8">
            <h1>{movieDetails.Title}</h1>
            <table className="table">
              <tbody>
                <tr>
                  <td>Director</td>
                  <td>{movieDetails.Director || "N/A"}</td>
                </tr>
                <tr>
                  <td>Plot</td>
                  <td>{movieDetails.Plot || "N/A"}</td>
                </tr>
                <tr>
                  <td>Language</td>
                  <td>{movieDetails.Language || "N/A"}</td>
                </tr>
                <tr>
                  <td>Year</td>
                  <td>{movieDetails.Year || "N/A"}</td>
                </tr>
                <tr>
                  <td>Writer</td>
                  <td>{movieDetails.Writer || "N/A"}</td>
                </tr>
                <tr>
                  <td>Awards</td>
                  <td>{movieDetails.Awards || "N/A"}</td>
                </tr>
                <tr>
                  <td>Actors</td>
                  <td>{movieDetails.Actors || "N/A"}</td>
                </tr>
                <tr>
                  <td>Released</td>
                  <td>{movieDetails.Released || "N/A"}</td>
                </tr>
              </tbody>
            </table>

            <button className="btn btn-primary" onClick={handleBack}>
        Back
      </button>
          </div>
        </>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
