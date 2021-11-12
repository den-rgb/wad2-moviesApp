import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
   root:{
    display: 'block', 
    padding: 30,
    size:"large"
   }
});

const HomePage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies);
  const classes=useStyles();
 
  const handleOnChange=(e)=>{
    
  };

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
    <div>
      <Pagination className={classes.root}  count={5} onChange={(e)=>handleOnChange(e)} />
    <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return 
          <>
           <AddToFavoritesIcon movie={movie} />
           <AddToWatchListIcon movie={movie}/>
           
          </>
        }}>
         
        </PageTemplate>
       
       </div>
     
      
  );
};

export default HomePage;