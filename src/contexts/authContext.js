import React, { useState, createContext, useEffect } from "react";
import { getGoogleAuthKey, login, reg, submitCode } from ".././api/movie-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const googleAuthKey=localStorage.getItem("googleKey");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [googleKey,setGoogleKey]= useState(googleAuthKey);
  const [isValidated,setIsValidated]=useState(false);
  

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const SecretKey=(key)=>{
    localStorage.setItem("googleKey",key);
    setGoogleKey(key);
    return key;
  }


    const getSecretKey=async()=>{
      const result=await getGoogleAuthKey();
      SecretKey(result.secret);
      console.log("sK "+SecretKey(result.secret));
      return SecretKey(result.secret);
      
    }
  
    

  

  

  

  const authCode=async(code)=>{
    const result=await submitCode(googleAuthKey,code);
    
    if(result.valid===true){
      setIsValidated(true);
    }
    return result.valid;
  };

  

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await reg(username, password);
    return (result.success !== false) ? true : false;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false),setIsValidated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        authCode,
        getSecretKey,
        isAuthenticated,
        isValidated,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;