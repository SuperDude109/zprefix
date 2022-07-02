// import { useEffect, useState} from 'react';
import { Routes , Route } from 'react-router-dom';
import Posts from './Posts';
import Login from './Login';
import Modify from './Modify';
import NewPost from './NewPost';
import NewUser from './NewUser';
import React from "react";
import { useContext,useState,useEffect } from "react";
import { AppContext } from '../../contexts/AppContext';
import config from '../../config.js'
import AllBlogs from './AllBlogs';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
// import config from './config'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


function ContentViewer() {
  let {values} = useContext(AppContext)

  let [names, setNames] = useState([ ]);

  useEffect(() => {
    fetch(ApiUrl + "/users")
      .then(response => response.json())
      .then(data => setNames(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div className='content-bar' style={{padding:"1vw",background:"lightgrey", height:"100vh"}}>
        <Routes>
          <Route path='' element={<AllBlogs/>}/>
          <Route path='/login'element={<Login/>}/> 
          <Route path='/user/posts'element={values.loggedin?<Posts/>:<div>Login to view your posts</div>}/>
          <Route path='/user'element={<Modify/>}/>
          <Route path='/users'element={
                <div>
                    { names.map(
                        (author,index) => {
                          return <div key ={index}>{(author.firstName + " " + author.lastName)}</div>
                        }
                    )}
                    </div>}/>
          <Route path='/edit/post' element={values.loggedin?<NewPost/>:<div>Login to create posts</div>}/>
          <Route path='/create/post' element={values.loggedin?<NewPost/>:<div>Login to create posts</div>}/>
          <Route path='/create/user' element={values.loggedin?<div>Logout to create new user</div>:<NewUser/>}/>
        </Routes>
    </div>
  );
}

export default ContentViewer;
