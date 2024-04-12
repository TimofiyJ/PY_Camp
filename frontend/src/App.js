import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Catalogue } from "./components/HouseCatalog/HouseCatalog";
import { Sidebar } from "./components/Sidebar/Sidebar";
import "./pages/HousePage.css";
import { HouseBlock } from "./components/House Block/HouseBlock";
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
    <Router>
      <div>
        <div className="page">
          <div className="sidebarBlock">
            <Sidebar />
          </div>
          <div className="catalogueBlock">
            <Routes>
              <Route path="/" element={<Catalogue data={data} />} />
              <Route path="/rooms/:houseId" element={<RoomCatalogue data={data} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;
