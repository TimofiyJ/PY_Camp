import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const ArrivalDropdown = () => {
    const [arrival, setArrival] = React.useState('');

    const handleChange = (event) => {
        setArrival(event.target.value);
    };

    return (
        <div className="filter-container">
            <Select
                value={arrival}
                onChange={handleChange}
                displayEmpty
                inputProps={{id: 'arrival-select'}}
                className="arrival-dropdown" // Додано клас для стилізації
            >

                <MenuItem value="" disabled>
                    Оберіть заїзд
                </MenuItem>
                <MenuItem value="10-12червня">10-12 червня</MenuItem>
                <MenuItem value="2-12липня">2-12 липня</MenuItem>
                <MenuItem value="20-30липня">20-30 липня</MenuItem>
                <MenuItem value="5-15серпня">5-15 серпня</MenuItem>
            </Select>
        </div>
    );
};
