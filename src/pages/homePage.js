import React, { useContext, useEffect, useState } from "react";
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
//import {useAuth} from "../contexts/authContext";
import { Redirect } from "react-router-dom";
import { MoviesContext } from "../contexts/moviesContext";



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
  //const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)
  

  const classes=useStyles();
  
  
 
  const fetchProjects = (page = 1) => fetch(`/api/movies?page=` + page+`&limit=10`).then((response) => {
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
        }}/>
         
        
       
       </div>

/*
<div>
      <Paper className={classes.root}>
     </Paper>
    
    <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return 
          <>
           <AddToFavoritesIcon movie={movie} />
           <AddToWatchListIcon movie={movie}/>
           
          </>
        }}/>
         
        
       
       </div>*/
  );
};

export default HomePage;