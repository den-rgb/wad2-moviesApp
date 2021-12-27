import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/movie-api";
import Spinner from '../components/spinner'
import WriteReview from "../components/cardIcons/writeReview";
import CardActions from "@material-ui/core/CardActions";




const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = favoriteMovieQueries.map((q) => q.data);
  const toDo = () => true;

  

  return (
    
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return <>
       
        <WriteReview movie={movie}/>
       
        </>
        }}
    />
    
    
    
  );
};

export default FavoriteMoviesPage;