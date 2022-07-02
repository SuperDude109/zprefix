// import { useEffect, useState} from 'react';
import React from "react"
import config from '../../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import { AppContext } from '../../contexts/AppContext';
import { useContext,useState } from "react";
import Post from "../Post";
import { useEffect } from "react";

// import config from './config'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


function Posts() {
  let {values} = useContext(AppContext)
  let {user_id} = values
  let [posts,setPosts] = useState([])
  let [showPost,setShowPost] = useState({title:null})
  let [displayedPost,setDisplayedPost] = useState("Loading")
  useEffect(async()=>{//utilizing this to update the screen once every second and to prevent repaid looping
    setTimeout(() => {
      fetch(ApiUrl+"/posts/user/"+user_id)
        .then(res => {
          return res.json()
        })
        .then(data => {
          setPosts([...data])
        })
    }, 500);
  },[posts])
      
  function checkTitle(post){
    return ((showPost.title!= null)?((post.title) == showPost.title):true)
  }

  useEffect(()=>{//this is to focus the content to one
    setDisplayedPost(
    ((posts.length>0)?(posts.filter(checkTitle)
    .map(
      ({user_id,title,content})=>(
        <div key={title+2}>
          <Post 
            user_id={user_id} 
            style={{padding:"1%"}} 
            key={title} 
            title={title} 
            content={content}
          />
          <button key={title+1} onClick={()=>{setShowPost({title:title})}}>Focus the Above Post</button>
        </div>
      ))
      ):("You have no posts yet D:")
    )
    )
  },[showPost,posts])
  // console.log(displayedPost)

  return (
    <div className='posts'>
      {displayedPost}
    </div>
  );
}

export default Posts;
