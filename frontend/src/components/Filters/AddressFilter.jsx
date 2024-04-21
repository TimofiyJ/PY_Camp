import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const AddressDropdown = () => {
    const [address, setAddress] = React.useState('');

    const handleChange = (event) => {
        setAddress(event.target.value);
    };

    return (
        <div className="filter-container">
            <Select
                value={address}
                onChange={handleChange}
                displayEmpty
                inputProps={{id: 'address-select'}}
                style={{marginLeft: '10px'}}
                className="dropdown" // Додано клас для стилізації
            >

                <MenuItem value="" disabled>
                    Оберіть адресу
                </MenuItem>
                <MenuItem value="lviv">Львів</MenuItem>
                <MenuItem value="kyiv">Київ</MenuItem>
                <MenuItem value="sambir">Самбір</MenuItem>
                <MenuItem value="drogobych">Дрогобич</MenuItem>
                <MenuItem value="other">Інші міста</MenuItem>
            </Select>
        </div>
    );
};
