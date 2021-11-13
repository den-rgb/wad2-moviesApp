import React  from "react";


import TrendingMoviesList from "../components/trendingMovieslist";
import TrendingPeopleList from "../components/trendingPeopleList";




const TrendingMoviesPage = () => {
   
 
return(
  <>
  <TrendingMoviesList></TrendingMoviesList>
  
  <TrendingPeopleList></TrendingPeopleList>
  </>
);

};
export default TrendingMoviesPage;