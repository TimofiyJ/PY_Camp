import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const HouseDropdown = () => {
    const [house, setHouse] = React.useState('');

    const handleChange = (event) => {
        setHouse(event.target.value);
    };

    return (
        <div className="filter-container">
            <Select
                value={house}
                onChange={handleChange}
                displayEmpty
                inputProps={{id: 'house-select'}}
                style={{marginLeft: '10px'}}
                className="dropdown" // Додано клас для стилізації
            >

                <MenuItem value="" disabled>
                    Оберіть будинок
                </MenuItem>
                <MenuItem value="trembita">Трембіта</MenuItem>
                <MenuItem value="marunka">Маринка</MenuItem>
                <MenuItem value="polonuna">Полонина</MenuItem>
                <MenuItem value="rosunka">Росинка</MenuItem>
            </Select>
        </div>
    );
};
