// import { useEffect, useState} from 'react';
import React from "react";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { Route, Routes } from 'react-router-dom';
// import config from './config'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


function TopBar() {
  let {values} = useContext(AppContext)
  let {username} = values
  return (
    <div className='topbar' style={{background:"DarkGrey", width:"85vw",height:"4vh"}}>
      <div>{`Welcome ${(username.length>1)?username:"Guest"}!`}</div>
      <Routes>
        <Route path='/user/posts' element={<div>double click to delete</div>} />
      </Routes>
      
    </div>
  );
}

export default TopBar;
