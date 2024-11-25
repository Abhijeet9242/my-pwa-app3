import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import MovieCard from './components/MovieCard';
import MovieList from './components/MovieList';
import {BrowserRouter ,Route,Routes} from "react-router-dom";
import MovieDetails from './components/MovieDetails';


function App() {
const [msg,setMsg] = useState("Hello React!!!!!")

  return (
    <BrowserRouter>
    <div>
      <Header/>
      {/* <Home/> */}
      {/* <MovieCard/> */}
      <div className='container'>
       <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/movies" element={<MovieList />} />
       <Route path="/details" element={<MovieDetails />} />
       </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
