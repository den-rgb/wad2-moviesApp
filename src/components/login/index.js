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
import Grid from "@material-ui/core/Grid";



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
    width:"100%",
    position:"relative",
    paddingRight:"10px",
    right:"30%",
    border:"3px",
    borderStyle:"inset"
  },
  log:{
    padding:"10px",
    paddingLeft:"10px",
    display:"flex",
    flexDirection:"column",
    width:"110%",
    position:"relative",
    border:"3px",
    borderStyle:"inset",
    left:"10%"
  },
  reg:{
    padding:"10px",
    paddingLeft:"10px",
    display:"flex",
    flexDirection:"column",
    width:"110%",
    position:"relative",
    border:"3px",
    borderStyle:"inset",
    left:"35%"
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

 
  const verify=()=>{
    if(email===localStorage.getItem("email")&&password===localStorage.getItem("password")){
       localStorage.setItem("userName",localStorage.getItem("logUser"));
       history.push("/");
    }
  }
 
 
  

  return (
    <Box component="div" className={classes.root}>
      <Typography component="h2" variant="h3">
        Login
      </Typography>
      <form
        className={classes.form}
        align={"center"}
        
      >
          <TextField
          
          
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
        
        
 <Grid container align={"center"}>
   <Grid xs={12}>
        <Box className={classes.form}>
          <Button
            type="Login"
            variant="contained"
            color="primary"
            className={classes.log}
            onSubmit={verify}
          >
            Login
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            align={"center"}
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
            type="register"
            variant="contained"
            color="active"
            className={classes.reg}
            onClick={() => {
              handleMenuSelect("/register");
            }}
          >
            Register
          </Button>

        </Box></Grid></Grid>
      </form>
    </Box>
  );
};

export default withRouter(LoginForm);