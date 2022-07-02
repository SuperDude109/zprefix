// import { useEffect, useState} from 'react';
import React from "react"
import config from '../../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import { useState, useEffect } from "react";
import Post from "../Post";

// import config from './config'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


function AllBlogs() {
  let [posts,setPosts] = useState([])
  let [showPost,setShowPost] = useState({title:null})
  let [displayedPost,setDisplayedPost] = useState("Loading")

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

  useEffect(async()=>{
    setTimeout(() => {
      fetch(ApiUrl+"/posts/user/0")
        .then(res => {
          return res.json()
        })
        .then(data => {
          setPosts([...data])
        })
    }, 500);
  },[posts])

 
  return (
    <div className='posts'>
      {displayedPost}
    </div>
  );
}

export default AllBlogs;
