import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import AboutMe from "./components/AboutMe";
import Groups from "./components/Groups";
import Messages from "./components/Messages";
const Profile = ()=>{
  //this.username = "john doe";
    return (
      
        <div>
          
            
            <div style={{
              display:"flex",
              justifyContent:"space-around",
              margin:"18px 0px",
              borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                    src="https://images.unsplash.com/photo-1502590464431-3b66d77494d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    />
                </div>
                <div>
                    <h3>john doe</h3>
                    <div style={{display:"flex",justifyContent:"space-between",width:"120%"}}>
                      <Router>
                      <nav style={{
                        display:"flex",
                        justifyContent:"space-around",
                        margin:"18px 0px",
                        borderBottom:"1px solid grey"}}>
                        <Link to="AboutMe"> About Me </Link>
                        <Link to="Groups"> Groups </Link>
                        <Link to="Messages"> Messages </Link>
                      </nav>
                        <Routes>
                          <Route path="AboutMe" element={<AboutMe />}/>
                          <Route path="Groups" element={<Groups />} />
                          <Route path="Messages" element={<Messages />} />
                          
                        </Routes>
                      </Router>
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile