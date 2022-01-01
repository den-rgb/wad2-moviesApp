import React , { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import 'reactjs-popup/dist/index.css';
import { AuthContext } from "../../contexts/authContext";

import { useHistory, withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import { Redirect } from "react-router-dom";


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
      failed:{
        border:"3px",
        
        position:"relative",
        display:"flex",
        padding:"10px",
        backgroundColor:"pink",
        color:"red",
        borderRadius:"20px",
      }
    ,
      invis:{
        visibility:"hidden"
      }
    }));




const FAPage = () => {

const classes=useStyles();
const [code,setCode]=useState("");
const context=useContext(AuthContext);
const [key,setKey]=useState("");
const [validated,setValidate]=useState(false);
const [errorMessage,setError]= useState("");
const [successful,setSuccess]=useState(true);

const submitCode=async()=>{
    const result=await context.authCode(code);
    if(result===true){ 
        setValidate(true);
        
    }else{
        setSuccess(false);
    }

}

useEffect(() => {

    if(successful==false){
      setError("Two-Factor Authentication Failed. Please Make Sure Your Code Is Correct");
    }
    else{
      setError("");
    }
  },[successful]);

const generateCode=async()=>{
    const result=await context.getSecretKey();
    setKey(result);

}
if (validated === true) {
    return <Redirect to={"/"} />;
  }
    return (
        <Box component="div" className={classes.root}>
          <Typography component="h2" variant="h3">
            Two-Factor Authentication
          </Typography>
          <br></br>

          <Typography component="h2" variant="h2">Enter Your 6 Digit Code Here:</Typography>
          <Typography className={successful?classes.invis:classes.failed}>{errorMessage}</Typography>
    
              <TextField
              variant="outlined"
              margin="normal"
              required
              id="code"
              label="code"
              name="code"
              value={code}
              autoFocus
              onChange={(e) => setCode(e.target.value)}
             
            />
            
            
            
            
     <Grid container align={"center"}>
       <Grid xs={12}>
            <Box className={classes.form}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.log}
                onClick={submitCode}
              >
                Submit
              </Button>

              <Button
                type="generate"
                variant="contained"
                color="secondary"
                className={classes.log}
                onClick={generateCode}
              >
                Generate Google Auth Code
              </Button>
              <Typography component="h2" variant="h2">Your Code:</Typography>
              <Typography component="h5" variant="h5" className={classes.root}>{key}</Typography>
    
            </Box></Grid></Grid>
        </Box>
      );
    };
    
    export default withRouter(FAPage);
    
