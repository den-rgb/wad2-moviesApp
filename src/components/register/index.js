import React , { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import useForm from "react-hook-form";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";


import { auth,db,signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    marginLeft:"25%",
    marginRight:"25%",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width:"30%",
    position:"relative",
    display:"block"
  
  },
  
  
  root2: {
    padding:"10px",
    display:"flex",
    flexDirection:"column",
    width:"100%",
    position:"relative",
    
    border:"3px",
    borderStyle:"inset"
  },
  buttons: {
    padding:"10px",
    display:"flex",
    flexDirection:"column",
    width:"100%",
    position:"relative",
    left:"70%",
    border:"3px",
    borderStyle:"inset"
  },
  
}));

const Registry = props => {
  const classes = useStyles();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [userName,setUserName]=useState("");
  const [registered,setRegistered] = useState(false);
  const context = useContext(AuthContext);
  const history =useHistory();
  const [errorMessage,setError]=useState("");
  
  const [user, loading, error] = useAuthState(auth);
 

  const handleSelect = () => {
    let path = `/login`;
    history.push(path);
    };

  const NewRegister = () =>{
    if(password.length>5){
      context.register(userName,password);
      setRegistered(true);
    }
  }
  
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) <Link to="/"/>;
  }, [user, loading]);
  
  const { from } = props.location.state || { from: {pathname:"/"}};

 
  if(registered===true){
    return <Redirect to="./login"/>
  }
  return (
    <Box component="div" className={classes.root}>
      <Typography component="h2" variant="h3">
        Register
      </Typography>
          <TextField
          
          className={classes.root2}
          variant="outlined"
          margin="normal"
          required
          id="name"
          label="UserName"
          name="username"
          value={userName}
          autoFocus
          onChange={({target})=>setUserName(target.value)}
          
        />

<TextField
          
          className={classes.root2}
          variant="outlined"
          margin="normal"
          required
          id="email"
          label="E-mail"
          name="email"
          value={email}
          
          onChange={ ({ target }) =>setEmail(target.value)}
        
        />
        
        
         <TextField
          className={classes.root2}
          variant="outlined"
          margin="normal"
          required
          value={password}
          id="password"
          label="Password"
          name="password"
          onChange={({target})=>setPassword(target.value)
          }
          
          
        />
       <Typography>{errorMessage}</Typography>
        
        
        <Grid container align={"center"}>
   <Grid xs={5} >
        <Box className={classes.buttons}>
          <Button
            type="Register"
            variant="contained"
            color="primary"
            
            onClick={NewRegister}
          >
            Register
          </Button>
         
         
          <Button
            type="login"
            variant="contained"
            color="secondary"
            
            onClick={handleSelect}
          >
            Back to Login
          </Button>

          <Button
            type="login"
            variant="contained"
            color="active"
            
            onClick={signInWithGoogle}
          >
           Sign up with Google
          </Button>

        </Box></Grid></Grid>
     
    </Box>
  );
};

export default withRouter(Registry);