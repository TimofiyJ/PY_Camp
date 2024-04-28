import React from 'react'
import { Sidebar } from "../components/Sidebar/Sidebar";
import {Catalogue, HouseCatalogue} from "../components/HouseCatalog/HouseCatalog";
import { HouseBlock } from "../components/HouseBlock/HouseBlock";
import "./ChildProfilePage.css";
// import {Catalogue} from "./components/RoomCatalogue/RoomCatalogue";
import {ChildInputForm} from "../components/ChildProfile/ChildProfile";


export const ChildProfilePage = () => {
    return (
        <div className="page">
            <div className="sidebarBlock">
                <Sidebar />
            </div>
            <div className="catalogueBlock">
                <ChildInputForm/>
            </div>
        </div>
    )
}
