import { HouseBlock } from "./components/HouseBlock/HouseBlock";
import { Catalogue } from "./components/HouseCatalog/HouseCatalog";
import "./pages/HousePage.css";
// import {Catalogue} from "./components/RoomCatalogue/RoomCatalogue";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { RoomCatalogue } from "./components/RoomCatalogue/RoomCatalogue";
import { HomePage } from "./pages/HomePage";

function App() {

  return (
    <div className='main-container'>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path="/rooms/:house" element={<RoomCatalogue/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
