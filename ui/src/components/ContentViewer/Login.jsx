import { useEffect} from 'react';
import config from '../../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import React from "react";
import { AppContext } from '../../contexts/AppContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let {values,setters} = useContext(AppContext)
  let {loggedin,username} = values


  useEffect(()=>console.log(loggedin,username),[loggedin])
  const nav = useNavigate()

  return (
    <div className='login' style={{display:"inline-grid"}}>
      <input id='username' placeholder="Username:"/>
      <input id='password' placeholder="Password:" type="password"/>
      <button onClick={()=>loggedin?signout():login()}>{loggedin?"sign out":"login"}</button>
    </div>
  );
  function signout(){
    setters.setLoggedin(false)
    setters.setUsername("")
  }
  function login(){
    const headers = {
       'Content-type': 'application/json'
    };
    const urlencoded ={
      "username": document.getElementById("username").value,
      "password": document.getElementById("password").value
    };
    const opts = {
      method: 'POST',//using post since get does not take a body and I find it sloppy to put the username and encrypted password in the browser
      headers: headers,
      body: JSON.stringify(urlencoded),
    };

    fetch(ApiUrl+"/login",opts)
    .then(res => res.json())
    .then(data => {
      setters.setUsername(document.getElementById("username").value)
      return data[0].login
    })
    .then((log)=>(log==="true")?loggedin(log):alert("invalid credentials")
    )
    function loggedin(log){
      setters.setLoggedin(log)
      setTimeout( ()=>
        {
          nav('/user/posts') 
        },500
      )
    }
  }
}

export default Login;
