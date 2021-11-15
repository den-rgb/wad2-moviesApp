import React ,{useState} from "react";
import TrendingShowsList from "../components/seasonsList";


import TrendingMoviesList from "../components/trendingMovieslist";
import TrendingPeopleList from "../components/trendingPeopleList";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DownArrow from "@material-ui/icons/ArrowRight";

import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
  root:{
    position:"relative",
    padding:"20px",
    fontWeight:"bold",
    fontSize:"40px",
    backgroundColor:theme.palette.secondary.main,
    borderRadius:"25px",
    width:"100%",

    "&:hover":{

      paddingRight:"100px",
      
    }
  },
  border:{
    border:"5px solid black",
    borderRadius:"25px"
  }
}));

const TrendingMoviesPage = () => {
   const [isListOpen,setListOpen]=useState(false);
   const classes = useStyles();
 
return(
  <>
  <div >
    <Button className={classes.border} onClick={()=>!isListOpen?setListOpen(true):setListOpen(false)}>
      {isListOpen &&(
  <TrendingMoviesList/>)}
  
  {!isListOpen &&(
    <Paper  className={classes.root}>Top Ten Trending Movies Today!<DownArrow fontSize="large"/></Paper>
  )}
  
  </Button>
    </div>
  
    <div >
    <Button className={classes.border} onClick={()=>!isListOpen?setListOpen(true):setListOpen(false)}>
      {isListOpen &&(
  <TrendingPeopleList/>)}
  
  {!isListOpen &&(
    <Paper  className={classes.root}>Top Ten Trending Movies Today!<DownArrow fontSize="large"/></Paper>
  )}
  
  </Button>
    </div>
    <div >
    <Button className={classes.border} onClick={()=>!isListOpen?setListOpen(true):setListOpen(false)}>
      {isListOpen &&(
  <TrendingShowsList/>)}
  
  {!isListOpen &&(
    <Paper  className={classes.root}>Top Ten Trending Movies Today!<DownArrow fontSize="large"/></Paper>
  )}
  
  </Button>
    </div>
  </>
);

};
export default TrendingMoviesPage;