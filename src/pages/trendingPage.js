import React ,{useContext} from "react";

import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getTrending} from '../api/tmdb-api'




const TrendingMoviesPage = () => {
  const {  data, error, isLoading, isError }  = useQuery('trending', getTrending)
  

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const movie=movies.map((movie)=>{
    return(
         movie.title
    )
    })
  
 console.log(data);
return(
  
    <>

        <h1>
            {movie}
            </h1>
    
      </>

);

};
export default TrendingMoviesPage;