import React , { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import { AuthContext } from "../../contexts/authContext";

import useForm from "react-hook-form";
import { withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";

import { auth,db,signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width:"30%",
    position:"relative",
    display:"block"
  },
 
  submit: {
    padding:"10px",
    display:"flex",
    flexDirection:"column",
    width:"50%",
    position:"relative",
    paddingRight:"10px",
    right:"10%",
    border:"3px",
    borderStyle:"inset"
  },
  log:{
    padding:"10px",
    paddingLeft:"10px",
    display:"flex",
    flexDirection:"column",
    width:"50%",
    position:"relative",
    border:"3px",
    borderStyle:"inset",
    left:"0%"
  },
  reg:{
    padding:"10px",
    paddingLeft:"10px",
    display:"flex",
    flexDirection:"column",
    width:"50%",
    position:"relative",
    border:"3px",
    borderStyle:"inset",
    left:"10%"
  },
  
  root2: {
    marginRight: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
    marginTop:theme.spacing(20),
  },
  
}));

const LoginPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const classes = useStyles();

  const [user, loading, error] = useAuthState(auth);

  const login = () => {
   context.authenticate(userName, password);
    console.log(context.isAuthenticated)
  };
  const { from } = props.location.state || { from: { pathname: "/" } };



  
 
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) <Link to="/"/>;
  }, [user, loading]);
  
 
 
  const handleMenuSelect = (pageURL) => {
    
  };


 
  
 
 
  
  if (context.isAuthenticated === true) {
    return <Redirect to={"./"} />;
  }
  return (
    <Box component="div" className={classes.root}>
      <Typography component="h2" variant="h3">
        Login
      </Typography>
          <TextField
          
          
          variant="outlined"
          margin="normal"
          required
          id="userName"
          label="User Name"
          name="userName"
          value={userName}
          autoFocus
          onChange={(e) => setUserName(e.target.value)}
         
        />
        
        
         <TextField
          
          variant="outlined"
          margin="normal"
          required
          value={password}
          id="password"
          label="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          
        />
       
        
        
 <Grid container align={"center"}>
   <Grid xs={12}>
        <Box className={classes.form}>
          <Button
            type="Login"
            variant="contained"
            color="primary"
            className={classes.log}
            onClick={login}
          >
            Login
          </Button>
          <Button
            type="register"
            variant="contained"
            color="secondary"
            align={"center"}
            className={classes.submit}
            onClick={handleMenuSelect("/register")}
          >
            Register
          </Button>
         
          
          <Button
            type="google"
            variant="contained"
            color="active"
            className={classes.reg}
             onClick={signInWithGoogle}
             
             >
              
          Login with Google
          </Button>

        </Box></Grid></Grid>
    </Box>
  );
};

export default withRouter(LoginPage);
