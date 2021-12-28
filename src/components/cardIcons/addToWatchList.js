import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import WatchListIcon from "@material-ui/icons/PlaylistAdd";



const AddToWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToWatchList = (e) => {
    e.preventDefault();
    context.addToWatchList(movie);
  };

  return (
    <IconButton aria-label="add to watchList" onClick={handleAddToWatchList}>
      <WatchListIcon color="primary" fontSize="small" />
    </IconButton>
  );
};

export default AddToWatchListIcon;