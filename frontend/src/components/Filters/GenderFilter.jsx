import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const GenderDropdown = () => {
    const [gender, setGender] = React.useState('');

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <div className="filter-container">
            <Select
                value={gender}
                onChange={handleChange}
                displayEmpty
                inputProps={{ id: 'gender-select' }}
                style={{ marginLeft: '10px' }}
                className="dropdown" // Додано клас для стилізації
            >

            <MenuItem value="" disabled>
                    Оберіть стать
                </MenuItem>
                <MenuItem value="female">Жінка</MenuItem>
                <MenuItem value="male">Чоловік</MenuItem>
            </Select>
        </div>
    );
};
