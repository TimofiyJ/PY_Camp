import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const AgeDropdown = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className="filter-container">
            <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{id: 'age-select'}}
                style={{marginLeft: '10px'}}
                className="dropdown" // Додано клас для стилізації
            >

                <MenuItem value="" disabled>
                    Оберіть вік
                </MenuItem>
                <MenuItem value="6-9years">6-9 років</MenuItem>
                <MenuItem value="10-12years">10-12 років</MenuItem>
                <MenuItem value="13-15years">13-15 років</MenuItem>
                <MenuItem value="15-17years">15-17 років</MenuItem>
            </Select>
        </div>
    );
};
