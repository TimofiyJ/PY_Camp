import React from 'react';
import { Sidebar } from "../components/Sidebar/Sidebar";
import { HouseBlock } from "../components/HouseBlock/HouseBlock";
import { RoomChildCatalogue } from "../components/RoomChildCatalogue/RoomChildCatalogue";
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Додано імпорт ThemeProvider та createTheme
import './ChildrenPage.css'; // Імпорт CSS файлу для стилізації

const theme = createTheme(); // Створено тему

export const RoomChildrenPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="page">
                <div className="sidebarBlock">
                    <Sidebar />
                </div>
                <div className="catalogueBlock">
                    <RoomChildCatalogue />
                </div>
            </div>
        </ThemeProvider>
    );
};
