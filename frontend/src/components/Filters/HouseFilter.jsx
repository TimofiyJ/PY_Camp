import React,  { useState, useEffect }  from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const HouseDropdown = ({onHouseChange}) => {
    const [house, setHouse] = React.useState('');
    const [data, setData] = useState([{}]);
    useEffect(() => {
        fetch("http://localhost:5000/houses-filter")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);
    const handleChange = (event) => {
        setHouse(event.target.value);
        onHouseChange(event.target.value);

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
                {data.map((house, index) => (
                    <MenuItem key={index} value={house.houseName}>
                        {`${house.houseName}`}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};
