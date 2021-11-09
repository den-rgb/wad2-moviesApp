import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'

const HomePage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)
 

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  console.log(data);

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const watchList = movies.filter(m => m.watchList)
  localStorage.setItem('watchList', JSON.stringify(watchList))

  return (
    <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return 
          <>
           <AddToFavoritesIcon movie={movie} />
           <AddToWatchListIcon movie={movie}/>
          </>
        }}
      /> 
  );
};

export default HomePage;