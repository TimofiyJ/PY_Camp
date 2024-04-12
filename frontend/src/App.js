import { HouseBlock } from "./components/House Block/HouseBlock";
import houses from "../src/data/houseData.json";
import { Catalogue } from "./components/HouseCatalog/HouseCatalog";
import { Sidebar } from "./components/Sidebar/Sidebar";
import "./pages/HousePage.css";
// import {Catalogue} from "./components/RoomCatalogue/RoomCatalogue";
import rooms from "../src/data/roomData.json";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("http://localhost:5000/houses")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <div className="page">
        <div className="sidebarBlock">
          <Sidebar />
        </div>
        <div className="catalogueBlock">
          <Catalogue data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
