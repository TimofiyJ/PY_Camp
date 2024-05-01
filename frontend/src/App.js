import { HouseBlock } from "./components/HouseBlock/HouseBlock";
import { Catalogue } from "./components/HouseCatalog/HouseCatalog";
import "./pages/HousePage.css";
// import {Catalogue} from "./components/RoomCatalogue/RoomCatalogue";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { RoomCatalogue } from "./components/RoomCatalogue/RoomCatalogue";
import { HomePage } from "./pages/HomePage";
import {RoomPage} from "./pages/RoomPage";
import {ChildrenPage} from "./pages/ChildrenPage";
import {SupervisorPage} from "./pages/SupervisorPage";
import {RoomChildrenPage} from "./pages/RoomChildrenPage";
import {ChildProfilePage} from "./pages/ChildProfilePage";
import {LoginPage} from "./pages/LoginPage";

function App() {

  return (
    <div className='page'>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path="/rooms/:house" element={<RoomPage/>} />
              <Route path="/roomChildren/:rooms/:house" element={<RoomChildrenPage/>} />
              <Route path="/childrens" element={<ChildrenPage/>} />
              <Route path='/supervisors' element={<SupervisorPage/>}></Route>
              <Route path='/childProfile/:id' element={<ChildProfilePage/>}></Route>
              <Route path='/login' element={<LoginPage/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
