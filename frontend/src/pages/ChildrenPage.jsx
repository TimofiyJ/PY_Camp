import React from 'react';
import { Sidebar } from "../components/Sidebar/Sidebar";
import { HouseBlock } from "../components/HouseBlock/HouseBlock";
import { ChildCatalogue } from "../components/ChildCatalogue/ChildCatalogue";
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Додано імпорт ThemeProvider та createTheme
import './ChildrenPage.css'; // Імпорт CSS файлу для стилізації
import { GenderDropdown } from '../components/Filters/GenderFilter'; // Шлях до вашого компонента з дропдауном
import { AgeDropdown } from '../components/Filters/AgeFilter'; // Шлях до вашого компонента з дропдауном
import { HouseDropdown } from '../components/Filters/HouseFilter'; // Шлях до вашого компонента з дропдауном
import { AddressDropdown } from '../components/Filters/AddressFilter'; // Шлях до вашого компонента з дропдауном
import { SearchField } from '../components/Filters/SearchField'; // Шлях до вашого компонента з дропдауном
import { RoomDropdown } from '../components/Filters/RoomFilter'; // Шлях до вашого компонента з дропдауном

const theme = createTheme(); // Створено тему

export const ChildrenPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="page">
                <div className="sidebarBlock">
                    <Sidebar />
                </div>
                <div className="catalogueBlock">
                    <div className="filter-container"> {/* Додано відступ для кращого розділення */}
                        <SearchField />
                        <GenderDropdown /> {/* Вставлення дропдауну */}
                        <AgeDropdown />
                        <AddressDropdown />
                        <HouseDropdown />
                        <RoomDropdown />
                    </div>
                    <ChildCatalogue />
                </div>
            </div>
        </ThemeProvider>
    );
};
