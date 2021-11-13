import React  from "react";

import { useQuery } from 'react-query'
import Spinner from '../../components/spinner'
import {getTrending} from '../../api/tmdb-api.js'
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme=>({
  root: {
    padding: "20px",
  },
  tableCell1:{
    backgroundColor:"black",
    color:"white",
    fontWeight:"bold"
  },
  tableCell2:{
    backgroundColor:"lightblue",
    fontWeight:"bold",
    fontSize:16,
  },
  tableTop:{
    backgroundColor:"black",
    color:"white",
    fontSize:20,
  },
  head:{
    fontSize:40,
    backgroundColor:theme.palette.secondary.main,
    color:"white",
    fontWeight:"bold"
  }
}));


const TrendingMoviesList = () => {
  
  const {  data, error, isLoading, isError }  = useQuery('trending', getTrending);
  
  const classes = useStyles();

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const movie=movies.map((movie)=>{
    return(
         <ul>{movie.title}</ul>
    )
    })

  const score=movies.map((score)=>{
    return(
         <ul>{score.vote_average}</ul>
    )
    })

   const description=movies.map((description)=>{
    return(
         <ul>{description.overview}</ul>
    )
    })

   

    function createData(num,name,score,desc) {
      return { num,name,score,desc };
    }
    
    const rows = [
      createData(1,movie[0],score[0],description[0]),
      createData(2,movie[1],score[1],description[1]),
      createData(3,movie[2],score[2],description[2]),
      createData(4,movie[3],score[3],description[3]),
      createData(5,movie[4],score[4],description[4]),
      createData(6,movie[5],score[5],description[5]),
      createData(7,movie[6],score[6],description[6]),
      createData(8,movie[7],score[7],description[7]),
      createData(9,movie[8],score[8],description[8]),
      createData(10,movie[9],score[9],description[9]),
    ];
  
 console.log(data);
return(
  <Grid container className={classes.root}>
  <Grid item xs={16}>
  <Paper className={classes.head} align="center">
    Top Ten Trending Movies Today!
  </Paper>

  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        
        <TableHead>
          <TableRow >
            
          <TableCell className={classes.tableTop} align="center"></TableCell>
            <TableCell className={classes.tableTop} align="center">Title</TableCell>
            <TableCell  className={classes.tableTop} align="right">Rating</TableCell>
            <TableCell className={classes.tableTop} align="center"> Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
                <TableCell className={classes.tableCell1} item key={row.num}>{row.num}</TableCell>
                <TableCell className={classes.tableCell2}item key={row.name}>{row.name}</TableCell>
                <TableCell className={classes.tableCell1} item key={row.score}>{row.score}</TableCell>
                <TableCell item key={row.desc}>{row.desc}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </Grid></Grid>
);

};
export default TrendingMoviesList;