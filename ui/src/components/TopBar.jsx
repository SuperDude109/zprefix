// import { useEffect, useState} from 'react';
import React from "react";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { Route, Routes } from 'react-router-dom';
// import config from './config'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUr
import "./TopBar.css"

function TopBar() {
  let {values} = useContext(AppContext)
  let {username} = values
  return (
    <div className='topbar'>
      <div className="greeting">{`Welcome ${(username.length>1)?username:"Guest"}!`}</div>
      <Routes>
        <Route path='/user/posts' element={<div>double click to delete</div>} />
      </Routes>
      
    </div>
  );
}

export default TopBar;
