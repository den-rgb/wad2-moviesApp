import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromWatchList = (e) => {
    e.preventDefault();
    context.removeFromWatchList(movie);
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromWatchList}
    >
      <PlaylistRemoveIcon color="primary" fontSize="small" />
    </IconButton>
  );
};

export default RemoveFromWatchListIcon;