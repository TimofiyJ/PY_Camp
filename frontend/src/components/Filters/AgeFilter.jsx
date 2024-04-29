import React,  { useState, useEffect }  from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const AgeDropdown = ({onAgeChange}) => {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
        onAgeChange(event.target.value);

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
                <MenuItem value="6">6-9 років</MenuItem>
                <MenuItem value="10">10-13 років</MenuItem>
                <MenuItem value="13">13-16 років</MenuItem>
            </Select>
        </div>
    );
};
