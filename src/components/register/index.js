import React , { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import useForm from "react-hook-form";
import { withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";




const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: theme.spacing(2),
    },
  },
  userField: {
    width: "40ch",
    left:425,
  },
  passwordField:{
    width:"40ch",
    left:30,
    top:100,
  },
  submit: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  
  root2: {
    marginRight: theme.spacing(2),
    flexDirection: "column",
    width:"40ch",
    marginTop:theme.spacing(20),
  },
  
}));

const Registry = ({history }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [userName,setUserName]=useState("");
 
  
 
  const handleMenuSelect = (pageURL) => {
    history.push(pageURL);
  };

  const handleSubmit2=()=>{
       handleMenuSelect("/login")
      
  };


 
  

  return (
    <Box component="div" className={classes.root}>
      <Typography component="h2" variant="h3">
        Register
      </Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit2}
        noValidate
      >
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
          inputRef={register({ 
              required: true,
             })}
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
          inputRef={register({ 
              required: true,
             })}
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
          onChange={({target})=>setPassword(target.value)}
          inputRef={register({  
            required: true,
            minLength: { value: 5, message:"Password must be longer!!"},
            
        })}
        />
        {errors.password && (
          <Typography variant="h6" component="p">
            {errors.password.message}
          </Typography>
        )}
        
        

        <Box className={classes.root2}>
          <Button
            type="Register"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{
              localStorage.setItem("userName",JSON.stringify(userName));
              localStorage.setItem("email",JSON.stringify(email));
              localStorage.setItem("password",JSON.stringify(password));
            }}
          >
            Register
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => {
              reset({
                email: "",
                password: "",
              });
            }}
          >
            Reset
          </Button>
         
          <Button
            type="login"
            variant="contained"
            color="active"
            className={classes.submit}
            
          >
            Back to Login
          </Button>

        </Box>
      </form>
    </Box>
  );
};

export default withRouter(Registry);