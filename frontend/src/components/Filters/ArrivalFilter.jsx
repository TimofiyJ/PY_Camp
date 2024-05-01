import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Import CSS file for styling

export const ArrivalDropdown = ({ history }) => {
    const [arrival, setArrival] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/arrivals")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch(error => console.error('Error fetching arrival data:', error));
    }, []);

    const handleChange = (event) => {
        const selectedArrival = event.target.value;
        setArrival(selectedArrival);
        fetch(`http://localhost:5000/arrival_by_date?arrival=${selectedArrival}`)
            .then(res => res.json())
            .then(arrivalData => {
                const queryString = `?arrival=${encodeURIComponent(JSON.stringify(arrivalData))}`;
                window.location.href = '/' + queryString; // Redirect to the root URL with query string
            })
            .catch(error => console.error('Error fetching arrival data:', error));
    };
    

    return (
        <div className="filter-container">
            <Select
                value={arrival}
                onChange={handleChange}
                displayEmpty
                inputProps={{ id: 'arrival-select' }}
                className="arrival-dropdown"
            >
                <MenuItem value="" disabled>
                    Select Arrival
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
