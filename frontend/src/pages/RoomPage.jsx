import React from 'react'
import { Sidebar } from "../components/Sidebar/Sidebar";
//import { Catalogue } from "../components/HouseCatalog/HouseCatalog";
import { HouseBlock } from "../components/HouseBlock/HouseBlock";
//import "./HousePage.css";
import {RoomCatalogue} from "../components/RoomCatalogue/RoomCatalogue";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";


export const RoomPage = () => {
    return (
        <div className="page">
            <div className="sidebarBlock">
                <Sidebar />
            </div>
            <div className="catalogueBlock">
                <RoomCatalogue/>
            </div>
        </div>
    )
}
