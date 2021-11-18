import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'
import Pagination from '@mui/material/Pagination';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import { InfoOutlined, PinDropSharp } from "@material-ui/icons";



const useStyles = makeStyles(theme=>({
   root:{
    padding: 1,
    right:0,
    position:'fixed',
    
    backgroundColor:theme.palette.secondary.main,
   }
}));

const HomePage = () => {

  const [page,setPage]=useState(1);
  
  
  //const {  data, error, isLoading, isError }  = useQuery('discover', getMovies);
  const classes=useStyles();
  
  
  const fetchProjects = (page = 1) => fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=` + page).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
 
  const {
    isLoading,
     isError,
     error,
     data,
    isFetching,
    isPreviousData,
  } = useQuery(['discover', page], () => fetchProjects(page), { keepPreviousData : true })

  
 
 
  function handleOnChange(event){
    
    console.log("p"+parseInt(event.currentTarget.textContext));
      setPage(event.currentTarget.textContext);
    
   }
  
 
  

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  const pageNum=data.total_pages;
  

 
  

  

  console.log(data);

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const watchList = movies.filter(m => m.watchList)
  localStorage.setItem('watchList', JSON.stringify(watchList))

 

  return (
    <div>
      <Paper className={classes.root}>
      <Pagination size="large" count={pageNum} onChange={(event,val)=>setPage(val)} /></Paper>
      {isFetching ? <span> Loading...</span> : null}{' '}
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