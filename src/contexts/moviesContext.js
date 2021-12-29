import React, { useContext, useEffect, useState } from "react";
import { addFavourite,getFavourite,addWatchList,getWatchList,removeFavourite,removeWatchList } from "../api/movie-api";
import { AuthContext } from "./authContext";


export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [watchList, setWatchList] = useState( [] )
  
  const context = useContext(AuthContext);

 
  
  

  const addToWatchList = (movie) => {
    
    addWatchList(context.userName,movie.id);
    
    setWatchList([...watchList,movie.id])
    
  };
  // We will use this function in a later section
  const removeFromFavorites = async (movie) => {
    await removeFavourite(context.userName,movie.id);
    console.log(movie.id);
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const removeFromWatchList = async (movie) => {
    await removeWatchList(context.userName,movie.id);
    console.log(movie.id);
    setWatchList( watchList.filter(
      (mId) => mId !== movie.id
    ) )
  };

 
  const addToFavorites = (movie) => {
     addFavourite(context.userName,movie.id);
     setFavorites([...favorites,movie.id])
    
  };

  useEffect(() => {
    const getFavourites = async () => {
      const f= await getFavourite(context.userName);
      const id=f.map((mId)=>mId.id);
      console.log(id);
      setFavorites(id);
    }

    const getTheWatchList= async () => {
      const f= await getWatchList(context.userName);
      const id=f.map((mId)=>mId.id);
      console.log(id);
      setWatchList(id);
    }

    
   
    
    getTheWatchList()
    getFavourites()

   }, [context.userName])

  

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        watchList,
       
        addToFavorites,
        addToWatchList,
        removeFromFavorites,
        removeFromWatchList
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;