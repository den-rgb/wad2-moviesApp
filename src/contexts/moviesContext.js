import React, { useContext, useEffect, useState } from "react";
import { addFavourite,getFavourite } from "../api/movie-api";
import { AuthContext } from "./authContext";


export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [watchList, setWatchList] = useState( [] )
  const context = useContext(AuthContext);

 

  

  const addToWatchList = (movie) => {
    setWatchList([...watchList,movie.id])
  };
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
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
      const fID=f.map((mId)=>mId.id);
      console.log(fID);
      setFavorites(fID);
      
    }

    getFavourites()

   }, [context.userName])

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        watchList,
        
        addToFavorites,
        addToWatchList,
        removeFromFavorites
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;