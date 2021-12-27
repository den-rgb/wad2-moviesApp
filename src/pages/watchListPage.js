import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/movie-api";
import Spinner from '../components/spinner'



  

const WatchListMoviesPage = () => {
  const {watchList: movieIds } = useContext(MoviesContext);
  

  

  // Create an array of queries and run in parallel.
  const watchListMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = watchListMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = watchListMovieQueries.map((q) => q.data);
  const toDo = () => true;

  return (
    <PageTemplate
      title="Your WatchList"
      movies={movies}
      action={() => {
        return (
          <>

          </>
        );
      }}
    />
    
  );
};


export default WatchListMoviesPage;