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
  },
  
  root2: {
    marginRight: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
    marginTop:theme.spacing(20),
  },
  
}));

const LoginForm = ({history }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [user, setUser]= useState();
  
 
  const handleMenuSelect = (pageURL) => {
    history.push(pageURL);
  };

  const handleSubmit2=()=>{
    if(email===localStorage.getItem("email")&&password===localStorage.getItem("password")){
       handleMenuSelect("/");
       const returningUser=localStorage.getItem("userName");
       localStorage.setItem("userName",returningUser);
       console.log("items : "+localStorage.getItem("email")+" "+localStorage.getItem("password"));
      }
       else{
        handleMenuSelect("/login");
        console.log("items : "+localStorage.getItem("email")+" "+localStorage.getItem("password"));
       }
  };

 
 
  

  return (
    <Box component="div" className={classes.root}>
      <Typography component="h2" variant="h3">
        Login
      </Typography>
      <form
        className={classes.form}
        
        noValidate
      >
          <TextField
          
          className={classes.userField}
          variant="outlined"
          margin="normal"
          required
          id="email"
          label="E-mail"
          name="email"
          value={email}
          autoFocus
          onChange={({ target }) => setEmail(target.value)}
          inputRef={register({ 
              required: true,
             })}
        />
        
        
         <TextField
          className={classes.passwordField}
          variant="outlined"
          margin="normal"
          required
          value={password}
          id="password"
          label="Password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
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
            type="Login"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{
              handleSubmit2();
            }}
          >
            Login
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
            type="reset"
            variant="contained"
            color="active"
            className={classes.submit}
            onClick={() => {
              handleMenuSelect("/register");
            }}
          >
            Register
          </Button>

        </Box>
      </form>
    </Box>
  );
};

export default withRouter(LoginForm);