import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const GenderDropdown = ({ onGenderChange }) => {
    const [gender, setGender] = React.useState(''); // Initialize gender with default value "Оберіть стать"

    const handleChange = (event) => {
        setGender(event.target.value);
        onGenderChange(event.target.value);
    };

    return (
        <div className="filter-container">
            <Select
                value={gender}
                onChange={handleChange}
                displayEmpty
                inputProps={{ id: 'gender-select' }}
                style={{ marginLeft: '10px' }}
                className="dropdown"
            >
                <MenuItem value="" disabled>
                    Оберіть стать
                </MenuItem>
                <MenuItem value="f">Жінка</MenuItem>
                <MenuItem value="m">Чоловік</MenuItem>
            </Select>
        </div>
    );
};

