import React,  { useState, useEffect }  from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const ArrivalDropdown = () => {
    const [arrival, setArrival] = React.useState('');
    const [data, setData] = useState([{}]);
    useEffect(() => {
        fetch("http://localhost:5000/arrivals")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);
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
                {data.map((arrival, index) => (
                    <MenuItem key={index} value={arrival.beginningDate}>
                        {`${arrival.beginningDate} - ${arrival.endDate}`}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};
