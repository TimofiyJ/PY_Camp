import React,  { useState, useEffect }  from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const AddressDropdown = ({onAddressChange}) => {
    const [address, setAddress] = React.useState('');
    const [data, setData] = useState([{}]);
    useEffect(() => {
        fetch("http://localhost:5000/address-filter")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);
    const handleChange = (event) => {
        setAddress(event.target.value);
        onAddressChange(event.target.value);
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
                {data.map((address, index) => (
                    <MenuItem key={index} value={address.name}>
                        {`${address.name}`}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};
