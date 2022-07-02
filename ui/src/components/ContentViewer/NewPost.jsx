import config from '../../config';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import { AppContext } from '../../contexts/AppContext';
import { useContext } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';

function NewPost() {
  let {values} = useContext(AppContext)
  let {user_id} = values
  const nav = useNavigate()
  return (
    <div className='modify' style={{display:"flex", flexDirection:"column"}}>
      <input id="title" placeholder="Title"/>
      <textarea id="create-post" placeholder="Type your post here" rows="32"></textarea>
      {<button onClick={()=>{sendPost()}}>Submit</button>}
    </div>
  );

  function sendPost(){
    // console.log("here are our values\ntitle= "+document.getElementById("title").value)
    console.log("Blog has been sent in for review")
   const opts = {
     method: 'POST',//using post since get does not take a body and I find it sloppy to put the username and encrypted password in the browser
     headers: {'Content-type': 'application/json'},
     body: JSON.stringify({
      "title": document.getElementById("title").value,
      "content": document.getElementById("create-post").value,
      "user_id":user_id
    }),
   };
   fetch(ApiUrl+"/posts",opts)
   nav('/user/posts')
  }
}

export default NewPost;
