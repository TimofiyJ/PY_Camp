import React from 'react'
import { Sidebar } from "../components/Sidebar/Sidebar";
import {Catalogue, HouseCatalogue} from "../components/HouseCatalog/HouseCatalog";
import { HouseBlock } from "../components/HouseBlock/HouseBlock";
import "./HousePage.css";
// import {Catalogue} from "./components/RoomCatalogue/RoomCatalogue";


export const HomePage = () => {
  return (
    <div className="page">
    <div className="sidebarBlock">
         <Sidebar />
     </div>
     <div className="catalogueBlock">
        <HouseCatalogue/>
     </div>
 </div>
  )
}
