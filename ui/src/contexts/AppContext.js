import React, {useState,useEffect} from "react";
import propTypes from 'prop-types';
import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const AppContext = React.createContext();
const AppProvider = ({children})=>{

  const [loggedin,setLoggedin]=useState(false)
  const [username,setUsername]=useState("")
  const [user_id,setUser_id]=useState("")
  const values = {
    loggedin,
    username,
    user_id
  }

  useEffect(()=>{
    fetch(username?ApiUrl+"/user/getuserid/"+username:ApiUrl+"/user/getuserid/"+0)
    .then(res => res.json())
    .then(data => setters.setUser_id(data.user_id))
  },[username])

  const setters = {
    setLoggedin,
    setUsername,
    setUser_id
  }

  return(
    <AppContext.Provider value={{values,setters}}>
      { children}
    </AppContext.Provider>
  )
}
AppProvider.propTypes={
  children: propTypes.any
}

export {AppProvider, AppContext}

