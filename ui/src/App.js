// import { useEffect, useState} from 'react';
import React from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import ContentViewer from './components/ContentViewer/ContentViewer';
import { AppProvider } from "./contexts/AppContext";


function App() {

  return (
    <AppProvider>
      <div className='webpage' style={{display:"inline-flex"}}> 
          {/* this will be where the sidebar lays */}
          <SideBar/>
          <div className='content' style={{padding:".5vw", display:"table-column" }}>
            <TopBar/>
            <ContentViewer/>
          </div>
       </div>
    </AppProvider>
  );
}

export default App;
