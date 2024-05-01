import React, { useState } from 'react';
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
    const [selectedGender, setSelectedGender] = useState(''); // State for selected gender
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedHouse, setSelectedHouse] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');

    const handleGenderChange = (selectedGender) => {
        setSelectedGender(selectedGender);
    };
    const handleAddressChange = (selectedAddress) => {
        setSelectedAddress(selectedAddress);
    };
    const handleAgeChange = (selectedAge) => {
        setSelectedAge(selectedAge);
    };
    const handleHouseChange = (selectedHouse) => {
        setSelectedHouse(selectedHouse);
    };
    const handleRoomChange = (selectedRoom) => {
        setSelectedRoom(selectedRoom);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="page">
                <div className="sidebarBlock">
                    <Sidebar />
                </div>
                <div className="catalogueBlock">
                    <div className="filter-container"> {/* Додано відступ для кращого розділення */}
                        <SearchField />
                        <GenderDropdown onGenderChange={handleGenderChange} />
                        <AgeDropdown onAgeChange={handleAgeChange} />
                        <AddressDropdown onAddressChange={handleAddressChange}/>
                        <HouseDropdown  onHouseChange={handleHouseChange}/>
                        <RoomDropdown  onRoomChange={handleRoomChange} selectedHouse={selectedHouse}/>
                    </div>
                    <ChildCatalogue 
                        selectedGender={selectedGender}
                        selectedAddress={selectedAddress}
                        selectedAge={selectedAge}
                        selectedHouse={selectedHouse}
                        selectedRoom={selectedRoom} />
                </div>
            </div>
        </ThemeProvider>
    );

};
