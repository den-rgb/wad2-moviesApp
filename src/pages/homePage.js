import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import { InfoOutlined } from "@material-ui/icons";

const useStyles = makeStyles(theme=>({
   root:{
    padding: 1,
    right:0,
    position:'fixed',
    
    backgroundColor:theme.palette.secondary.main,
   }
}));

const HomePage = () => {
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies);
  const classes=useStyles();
  const [nextpage,setNextPage]=useState(false);
  
  

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const slicedArray=movies.slice(0,10);
  const slicedArray2=movies.slice(10,20);
  

  const handlePaginator=(()=>{
    setNextPage(true);
    
    if(nextpage){
      setNextPage(false);
    }
  })

  console.log(data);

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const watchList = movies.filter(m => m.watchList)
  localStorage.setItem('watchList', JSON.stringify(watchList))

 

  return (
    <div>
      <Paper className={classes.root}>
      <Pagination size="large" count={2} onChange={handlePaginator}/></Paper>
    <PageTemplate
        title="Discover Movies"
        movies={nextpage?slicedArray2:slicedArray}
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