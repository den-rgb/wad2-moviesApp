import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import WatchListIcon from "@material-ui/icons/PlaylistAdd";

const AddToWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

 
  return (
    <IconButton aria-label="add to favorites">
      <WatchListIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchListIcon;