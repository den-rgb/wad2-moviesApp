import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { AuthContext } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const handleAddToFavorites = (e) => {
    if(authContext.isAuthenticated){
    e.preventDefault();
    context.addToFavorites(movie);
    }else{
     handleSelect();
    }
  };

  const handleSelect = () => {
    let path = `/login`;
    history.push(path);
    };
  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="small" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;