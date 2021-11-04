import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";



const UpcomingMoviesPage = () => {
    const [movies, setMovies] = useState([]);


useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      //selectFavorite={addToFavorites}
    />
  );
};

export default UpcomingMoviesPage;