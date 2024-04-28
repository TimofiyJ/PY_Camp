import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const DetachmentDropdown = () => {
    const [detachment, setDetachment] = React.useState('');

    const handleChange = (event) => {
        setDetachment(event.target.value);
    };

    return (
        <div className="filter-container">
            <Select
                value={detachment}
                onChange={handleChange}
                displayEmpty
                inputProps={{id: 'detachment-select'}}
                style={{marginLeft: '10px'}}
                className="dropdown" // Додано клас для стилізації
            >

                <MenuItem value="" disabled>
                    Оберіть загін
                </MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
            </Select>
        </div>
    );
};
