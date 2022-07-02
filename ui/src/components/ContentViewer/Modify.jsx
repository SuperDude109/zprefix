import config from '../../config';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import React from "react";
// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


function Modify() {

  return (
    <div className='modify'>
      <input id="first_name" placeholder="First Name"/>
      <input id="last_name" placeholder="Last Name"/>
      <div></div>
      <input id="username" placeholder="UserName"/>
      <input id="new_username" placeholder="New UserName"/>
      <div></div>
      <input id="password" type={"password"} placeholder="Password"/>
      <input id="backup_password" type={"password"} placeholder="Retype Password"/>
      <button onClick={updateUser}>Submit</button>
    </div>
  );
  function updateUser(){
    let newUser={
      "first_name":  document.getElementById("first_name").value,
      "last_name":  document.getElementById("last_name").value,
      "username":  document.getElementById("username").value,
      "new_user_name":  document.getElementById("new_username").value,
      "password":  document.getElementById("password").value,
      "backup_password":  document.getElementById("backup_password").value,
   }
   if(newUser.password === newUser.password){
    const opts = {
      method: 'PATCH',//using post since get does not take a body and I find it sloppy to put the username and encrypted password in the browser
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newUser),
    };
    alert("Sending New User in for review")
    fetch(ApiUrl+"/users",opts)
  }else{alert("passwords did not match")}
  }
}

export default Modify;
