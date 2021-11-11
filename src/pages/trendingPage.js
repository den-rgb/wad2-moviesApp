import React ,{useContext} from "react";

import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getTrending} from '../api/tmdb-api'
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});


const TrendingMoviesPage = () => {
  const {  data, error, isLoading, isError }  = useQuery('trending', getTrending)
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
         <li>{movie.title}</li>
    )
    })

  const score=movies.map((score)=>{
    return(
         <li>{score.vote_average}</li>
    )
    })

   const description=movies.map((description)=>{
    return(
         <li>{description.overview}</li>
    )
    })

    function createData(name,score,desc) {
      return { name,score,desc };
    }
    
    const rows = [
      createData(movie,score,description)
      
    ];
  
 console.log(data);
return(
  <Grid container className={classes.root}>
  <Grid item xs={12}>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell >Rating</TableCell>
            <TableCell> Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.score}</TableCell>
              <TableCell>{row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid></Grid>
);

};
export default TrendingMoviesPage;