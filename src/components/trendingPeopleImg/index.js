import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { getTrendingPeople } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    borderRadius:100,
    maxHeight:100,
  },
  gridList: {
    width: 450,
    height: '100vh',
  },
}));

const TrendingPeopleImg = ({ movie,num}) => {
  const classes = useStyles();
  const { data , error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getTrendingPeople
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const images = data.results

  const img=images.map((img)=>{
    return(
         img.profile_path
    )
    })
  

  return (
    <img className={classes.root} src={`https://image.tmdb.org/t/p/w185/${img[num]}`} alt={img[num]}></img>
  );
};

export default TrendingPeopleImg;