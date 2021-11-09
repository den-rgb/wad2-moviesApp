import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getTrending} from '../api/tmdb-api'
import MovieList from "../components/movieList";



const TrendingMoviesPage = () => {
  const {  data, error, isLoading, isError }  = useQuery('trending', getTrending)
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  
 console.log(data);
return(
    <>
{movies.map((movie)=>{
    return(
        <h1>
            {movie.title}
            </h1>
    )
})}
      </>
);
};


export default TrendingMoviesPage;