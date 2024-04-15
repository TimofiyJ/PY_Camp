import { HouseBlock } from "./components/HouseBlock/HouseBlock";
import { Catalogue } from "./components/HouseCatalog/HouseCatalog";
import { Sidebar } from "./components/Sidebar/Sidebar";
import "./pages/HousePage.css";
// import {Catalogue} from "./components/RoomCatalogue/RoomCatalogue";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RoomCatalogue } from "./components/RoomCatalogue/RoomCatalogue";


function App() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("http://localhost:5000/houses?arrival=1")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="page">
       <div className="sidebarBlock">
            <Sidebar />
        </div>
        <div className="catalogueBlock">
          <Router>
            <Routes>
              <Route path="/houses" element={<Catalogue data={data} />} />
              <Route path="/rooms" element={<RoomCatalogue/>} />
            </Routes>
          </Router>
        </div>
    </div>
  );
}


export default App;
