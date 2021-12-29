import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieList";
import Typography from "@material-ui/core/Typography";

import Box from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  noMovies:{
    fontSize:50,
    fontWeight:"bold",
    border:"3px",
    borderStyle:"inset",
    display:"flex",
    flexDirection:"column",
    padding:"10px",
    alignSelf:"center",
    position:"relative",
    backgroundColor:theme.palette.secondary.main,
    color:"white",
    borderRadius:"25px",
    left:"15%",
    bottom:"10%"
  },
  text:{
    fontSize:25,
    fontWeight:"bold",
    display:"flex",
    flexDirection:"column",
    padding:"10px",
    alignSelf:"center",
    right:"35%",
    backgroundColor:"lightblue",
    borderRadius:"25px",
    border:"3px",
    borderStyle:"inset",
  }
}));

function MovieListPageTemplate({ movies, title, action }) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        {displayedMovies!=0?
        <MovieList action={action} movies={displayedMovies}></MovieList>:<><Typography  className={classes.noMovies}>Uh Oh! It's Empty!</Typography><Typography className={classes.text}>Try Adding Some Movies</Typography></>
}
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;