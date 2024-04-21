import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const RoomDropdown = () => {
    const [room, setRoom] = React.useState('');

    const handleChange = (event) => {
        setRoom(event.target.value);
    };

    return (
        <div className="filter-container">
            <Select
                value={room}
                onChange={handleChange}
                displayEmpty
                inputProps={{id: 'room-select'}}
                style={{marginLeft: '10px'}}
                className="dropdown" // Додано клас для стилізації
            >

                <MenuItem value="" disabled>
                    Оберіть кімнату
                </MenuItem>
                <MenuItem value="room1">1</MenuItem>
                <MenuItem value="room2">2</MenuItem>
                <MenuItem value="room3">3</MenuItem>
                <MenuItem value="room4">4</MenuItem>
                <MenuItem value="room5">5</MenuItem>
                <MenuItem value="room6">6</MenuItem>
                <MenuItem value="room7">7</MenuItem>
            </Select>
        </div>
    );
};
