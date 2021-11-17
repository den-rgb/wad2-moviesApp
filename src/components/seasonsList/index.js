import React, { useState }  from "react";

import { useQuery } from 'react-query'
import Spinner from '../../components/spinner'
import { getTvShows} from '../../api/tmdb-api.js'
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import TvShowImg from "../tvShowImg";
import { Typography } from "@material-ui/core";


const useStyles = makeStyles(theme=>({
  root: {
    padding: "40px",
    width:"100%",
    
    
  },
  tableCell1:{
    backgroundColor:"black",
    color:"white",
    fontWeight:"bold"
  },
  chucky:{
    backgroundImage:`url("https://image.tmdb.org/t/p/w1280/xAKMj134XHQVNHLC6rWsccLMenG.jpg")`,
    backgroundSize:"cover",
    fontSize:30,
    fontWeight:"bold",
    display:"block",
    padding:"70px",
  },
  squid:{
    backgroundImage:`url("https://image.tmdb.org/t/p/w1280/qw3J9cNeLioOLoR68WX7z79aCdK.jpg")`,
    backgroundSize:"cover",
    fontSize:30,
    fontWeight:"bold",
    display:"block",
    padding:"70px",
  },
  arcane:{
    backgroundImage:`url("https://image.tmdb.org/t/p/w1280/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg")`,
    backgroundSize:"cover",
    fontSize:30,
    fontWeight:"bold",
    display:"block",
    padding:"70px",
  },
  maradona:{
    backgroundImage:`url("https://image.tmdb.org/t/p/w1280/auuN4uAvn6KiqyYX5r7BsXrMPNx.jpg")`,
    backgroundSize:"cover",
    fontSize:30,
    fontWeight:"bold",
    display:"block",
    padding:"70px",
  },
  rachael:{
    backgroundImage:`url("https://image.tmdb.org/t/p/w1280/oC9SgtJTDCEpWnTBtVGoAvjl5hb.jpg")`,
    backgroundSize:"cover",
    fontSize:30,
    fontWeight:"bold",
    display:"block",
    padding:"70px",
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
  },
  text:{
      left:0,
      position:"relative",
      color:"white",
      backgroundColor:"rgba(0,0,0,0.5)",
      
      height:"auto"

      
     
  }
}));



const SeasonList = () => {
  
  const {  data, error, isLoading, isError }  = useQuery('tv', getTvShows);
  const [isShown,setIsShown]=useState(false);
  const classes = useStyles();

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const shows = data.results;

  const showTitle=shows.map((showTitle)=>{
    return(
         <ul>{showTitle.name}</ul>
    )
    })

    
  

   

    function createData(name) {
      return { name };
    }
    
    const rows = [
      createData(showTitle),
      
      
     
    ];
  
 console.log(data);
return(
    
  <Grid container className={classes.root}>
  <Grid item xs={12}>
  <Paper className={classes.head} align="center">
    Top 5 Trending Shows Today!
  </Paper>

  <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }} size="small" aria-label="a dense table">
        
        <TableHead>
          <TableRow >
            
          
            <TableCell className={classes.tableTop} align="center"></TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
               
                <TableCell className={classes.chucky} item key={row.name} 
                onMouseEnter={()=>setIsShown(true)}
                onMouseLeave={()=>setIsShown(false)}>
                    {isShown &&( <Paper className={classes.text}>{row.name[0]} </Paper>)}
                </TableCell>

                <TableCell className={classes.squid} item 
                onMouseEnter={()=>setIsShown(true)}
                onMouseLeave={()=>setIsShown(false)}>
                    {isShown &&( <Paper className={classes.text}>{row.name[1]} </Paper>)}
                </TableCell>

                <TableCell className={classes.arcane} item 
                onMouseEnter={()=>setIsShown(true)}
                onMouseLeave={()=>setIsShown(false)}>
                    {isShown &&( <Paper className={classes.text}>{row.name[2]} </Paper>)}
                </TableCell>

                <TableCell className={classes.maradona} item 
                onMouseEnter={()=>setIsShown(true)}
                onMouseLeave={()=>setIsShown(false)}>
                    {isShown &&( <Paper className={classes.text}>{row.name[3]} </Paper>)}
                </TableCell>

                <TableCell className={classes.rachael} item 
                onMouseEnter={()=>setIsShown(true)}
                onMouseLeave={()=>setIsShown(false)}>
                    {isShown &&( <Paper className={classes.text}>{row.name[5]} </Paper>)}
                </TableCell>

               

            </TableRow>
           
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </Grid></Grid>
    
);

};
export default SeasonList;