import React from 'react'
import { Sidebar } from "../components/Sidebar/Sidebar";
//import { Catalogue } from "../components/HouseCatalog/HouseCatalog";
import { HouseBlock } from "../components/HouseBlock/HouseBlock";
//import "./HousePage.css";
//import {RoomCatalogue} from "../components/RoomCatalogue/RoomCatalogue";
import {ChildCatalogue} from "../components/ChildCatalogue/ChildCatalogue";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';


export const ChildrenPage = () => {
    return (
        <div className="page">
            <div className="sidebarBlock">
                <Sidebar />
            </div>
            <div className="main-container">
                <ChildCatalogue/>
            </div>
        </div>
    )
}
