import React from 'react';
import TextField from '@mui/material/TextField';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const SearchField = ({ onSearch }) => {
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        onSearch(searchTerm);
    };

    return (
        <div style={{ marginTop: '-10px' }}>
            <TextField
                label="Пошук"
                variant="outlined"
                onChange={handleSearchChange}
                size="small"
            />
        </div>
    );
};

