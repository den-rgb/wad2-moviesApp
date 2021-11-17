import React ,{useState} from "react";
import TrendingShowsList from "../components/seasonsList";

import Grid from "@material-ui/core/Grid";
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
    align:"center",

    "&:hover":{

      paddingRight:"100px",
      
    }
  },
  back:{
    backgroundImage:`url("https://image.tmdb.org/t/p/original/e6v08948EZVvLrx0sWpmglguY9e.jpg") `,
    backgroundRepeat:"repeat-y",
    padding:0,
    margin:0,
    boxSizing:"border-box",
    left:0,
    right:0,
    position:"absolute",
    paddingBottom:"20%",
    top:"20%"
  },
  border:{
    border:"5px solid black",
    borderRadius:"25px"
  },
  gridRoot:{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    
    paddingTop:"1%",
  },
  paper:{
    backgroundColor:theme.palette.secondary.main,
    fontSize:50,
    fontWeight:"bold",
    fontStyle:"italic",
    padding:"2px",
    position:"absolute",
    width:"100%",
    top:"10%",
    left:0
   
  }
}));

const TrendingMoviesPage = () => {
   const [isListOpen,setListOpen]=useState(false);
   const [isListOpen2,setListOpen2]=useState(false);
   const [isListOpen3,setListOpen3]=useState(false);
   
   
   const classes = useStyles();
 
return(
 <>
 <Paper className={classes.paper} align={"center"}>See Whats Hot Today!</Paper>
 <body className={classes.back}>
 
  <Grid container className={classes.gridRoot}>
  <Grid item align={"center"} xs={12}>
    
  <div >
    <Button className={classes.border} onClick={()=>!isListOpen?setListOpen(true):setListOpen(false)}>
      {isListOpen &&(
  <TrendingMoviesList/>)}
  
  {!isListOpen &&(
    <Paper  className={classes.root}>Top Ten Trending Movies Today!<DownArrow fontSize="large"/></Paper>
  )}
  
  </Button>
    </div>
  <div><br></br></div>
    <div >
    <Button className={classes.border} onClick={()=>!isListOpen2?setListOpen2(true):setListOpen2(false)}>
      {isListOpen2 &&(
  <TrendingPeopleList/>)}
  
  {!isListOpen2 &&(
    <Paper  className={classes.root}>Top Ten Trending People Today!<DownArrow fontSize="large"/></Paper>
  )}
  
  </Button>
    </div>
    <div><br></br></div>
    <div >
    <Button className={classes.border} onClick={()=>!isListOpen3?setListOpen3(true):setListOpen3(false)}>
      {isListOpen3 &&(
  <TrendingShowsList/>)}
  
  {!isListOpen3 &&(
    <Paper  className={classes.root}>Top 5 Trending Shows Today!<DownArrow fontSize="large"/></Paper>
  )}
  
  </Button>
    </div></Grid></Grid></body></>
  
);

};
export default TrendingMoviesPage;