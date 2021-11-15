import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { getTvShows } from "../../api/tmdb-api";
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

const TvShowImg = ({ show,num}) => {
  const classes = useStyles();
  const { data , error, isLoading, isError } = useQuery(
    ["imagesTV", { id: show.id }],
    getTvShows
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const imagesTV = data.results

  const imgTV=imagesTV.map((imgTV)=>{
    return(
         imgTV.profile_path
    )
    })
  

  return (
    <img className={classes.root} src={`https://image.tmdb.org/t/p/original/${imgTV[num]}`} alt={imgTV[num]}></img>
  );
};

export default TvShowImg;