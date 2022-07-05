import config from "../config";
/* eslint-disable react/prop-types */
import React from "react";
import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


function Post({user_id,title,content}) {
  const nav = useNavigate()
  let [username,setUsername]=useState("");
  let [displayedText,setDisplayedText] = useState("loading")
  let [expand,setExpand]= useState(false)
  let [message,setMesssage] = useState(content)

  useEffect(
    ()=>fetch(ApiUrl+'/user/getusername/'+user_id)
      .then(res => res.json())
      .then(data=>setUsername(data.username))
      ,[]
  )
  
  useEffect(()=>{    
      setDisplayedText(
        expand?
        (<textarea id="editcontent" //default value is preventing us from showing all of the text from content
            placeholder="Type your post here" 
            rows="16" 
            value={message.substring(0,100) + (expand?
              (message.substring(100,message.length)):
              ((message.length>100)
                ?"...":""))}
            onChange={(evt) => setMesssage(evt.target.value)}
        />)://or we create a read only text field
        (<textarea id="content" 
            placeholder="Type your post here" 
            rows="16" 
            value={message.substring(0,100) + (expand?
              (message.substring(100,message.length)):
              ((message.length>100)
                ?"...":""))}
            onChange={() => null}
        />)
      )
  }
  ,[expand,message])
  
  return (
    <div className='post'>
      <div id="titlebar">
        <div id = "title">title:{title}</div>
        <div>username:{username}</div>
      </div>
      {displayedText}
       
      <button onDoubleClick={deletePost}>Delete</button>
      <button onClick={()=>setExpand(!expand)}>{expand?"Cancel Edit":"show more"}</button>
      <button onClick={()=>{editBlog()}}>{expand?"Submit ":""}Edit</button>
    {/* 
        for some rason this makes the delete button completly disapear
      <Routes>
        <Route path='/user/posts' element={(<button onDoubleClick={deletePost}>Delete</button>)} />
      </Routes>
   */}
    </div>
  );
  function editBlog(){
    if(expand){
      console.log("Submitted an edit on title",title)
      const opts = {
        method: 'PATCH',//using post since get does not take a body and I find it sloppy to put the username and encrypted password in the browser
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
        "title": title,
        "content": document.getElementById("editcontent").value,
        "user_id":user_id
      }),
      };
      fetch(ApiUrl+"/posts",opts)
      setTimeout( ()=>
        {
          nav('/refreshing/') 
          nav('/user/posts') 
        },500
      )
    }
    setExpand(!expand)
  }

  function deletePost(){
    console.log("You just deleted that post! "+(title))

    const opts = {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
      "title": title,
    }),
    };
    setTimeout( ()=>
        {
          nav('/refreshing/') 
          nav('/user/posts') 
        },500)
    fetch(ApiUrl+"/posts",opts)
  }
} 

export default Post;
