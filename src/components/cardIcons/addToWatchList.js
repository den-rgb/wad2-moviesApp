import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import WatchListIcon from "@material-ui/icons/PlaylistAdd";
import { AuthContext } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";


const AddToWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const handleAddToWatchList = (e) => {
    if(authContext.isAuthenticated){
    e.preventDefault();
    context.addToWatchList(movie);
  }else{
    handleSelect();
   }
  };

  const handleSelect = () => {
    let path = `/login`;
    history.push(path);
    };

  return (
    <IconButton aria-label="add to watchList" onClick={handleAddToWatchList}>
      <WatchListIcon color="primary" fontSize="small" />
    </IconButton>
  );
};

export default AddToWatchListIcon;