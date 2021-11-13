import React  from "react";

import { useQuery } from 'react-query'
import Spinner from '../../components/spinner'
import {getTrending, getTrendingPeople} from '../../api/tmdb-api.js'
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import TrendingPeopleImg from "../trendingPeopleImg";


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
    fontWeight:"bold",
    padding:"20px"
  }
}));


const TrendingPeopleList = () => {
  
  const {  data, error, isLoading, isError }  = useQuery('trendingPeople', getTrendingPeople);
  
  const classes = useStyles();

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const persons = data.results;

  const person=persons.map((person)=>{
    return(
         <ul>{person.name}</ul>
    )
    })

  

   

    function createData(name) {
      return { name };
    }
    
    const rows = [
      createData(person[0]),
      createData(person[1]),
      createData(person[2]),
      createData(person[3]),
      createData(person[4]),
      createData(person[5]),
      createData(person[6]),
      createData(person[7]),
      createData(person[8]),
      createData(person[9]),
     
    ];
  
 console.log(data);
return(
  <Grid container className={classes.root}>
  <Grid item xs={16}>
  <Paper className={classes.head} align="center">
    Top Ten Trending People Today!
  </Paper>

  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        
        <TableHead>
          <TableRow >
            
          
            <TableCell className={classes.tableTop} align="center"></TableCell>
            <TableCell className={classes.tableTop} align="center"></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
               
               <TableCell className={classes.tableCell2} ><TrendingPeopleImg  movie={person} num={rows.indexOf(row)}></TrendingPeopleImg></TableCell>
                <TableCell className={classes.tableCell2}item key={row.name}>{row.name} </TableCell>
                
                


                
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </Grid></Grid>
);

};
export default TrendingPeopleList;