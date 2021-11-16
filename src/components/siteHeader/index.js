import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withRouter } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Avatar } from "@material-ui/core";
import LoginIcon from "@material-ui/icons/Person"

import { Link, useHistory } from "react-router-dom";
import { db,auth,signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  notVisible:{
    visibility:"hidden",
  },
  isVisible:{
    visibility:"visible",
  }
}));


const SiteHeader = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
 const localName=localStorage.getItem("userName");
  
  const [user, loading, error] = useAuthState(auth);
  const [userName, setName] = useState("");
  const history = useHistory();
  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("newUsers")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  
  
  

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Your WatchList", path: "/movies/watchList" },
    {label: "Trending" , path:"/movies/trending"},
  ];

  

  if(localName==="undefined"||localName==="null"||localName===null){
    localStorage.setItem("userName","");
  }

  const checkTrue=()=>{
     if(localName===""||localName===null){
      handleMenuSelect('/login');
      
     }else if(localName==="undefined"||localName==="null"){
      handleMenuSelect('/login');
      
     }else{
       console.log(localName);
     }

  };

  const handleMenuSelect = (pageURL) => {
    history.push(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
                    <IconButton
                      
                      onClick={() => checkTrue()}
                    >
                      <LoginIcon color="primary" fontSize="large"/>
                      Welcome {localName}
                    </IconButton>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>

                  
                ))}
              </>
            )}
            <Button
                      className={localName!=""?classes.isVisible : classes.notVisible}
                      onClick={localStorage.setItem("userName","")}
                    >
                      LogOut
                    </Button>      
                  
        </Toolbar>
        
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default withRouter(SiteHeader);