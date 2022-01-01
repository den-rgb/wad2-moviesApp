import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; 
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from './pages/upcomingMoviesPage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import WatchListPage from './pages/watchListPage';
import Login from './components/login';
import TFA from './components/2fa';
import TrendingMoviesPage from "./pages/trendingPage";
import Register from "./components/register";
import AuthProvider from "./contexts/authContext";
import PrivateRoute from "./components/privateRoute.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});



const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter><AuthProvider>
          <SiteHeader /><MoviesContextProvider>    
      <Switch>
        <PrivateRoute exact path="/login/twoFactor" component={TFA}/>
        <Route exact path="/movies/trending" component ={TrendingMoviesPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component ={Register}/>
        <PrivateRoute exact path="/movies/watchList" component={WatchListPage}/>
        <Route exact path="/reviews/form" component={AddMovieReviewPage} />
        <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />
        <PrivateRoute exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        
        <Route exact path="/" component={HomePage} />
        
        <Redirect from="*" to="/" />
      </Switch></MoviesContextProvider></AuthProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));