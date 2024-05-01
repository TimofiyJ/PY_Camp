import React,  { useState, useEffect }  from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Filter.css'; // Імпорт CSS файлу для стилізації

export const RoomDropdown = ({onRoomChange, selectedHouse}) => {
    const [room, setRoom] = React.useState('');
    const [data, setData] = useState([{}]);
    useEffect(() => {
        if(selectedHouse) { // Only fetch data if selectedHouse is available
            fetch(`http://localhost:5000/rooms-filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ house: selectedHouse })
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error fetching rooms:', error);
                });
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });
        }
    }, [selectedHouse]);
    const handleChange = (event) => {
        setRoom(event.target.value);
        onRoomChange(event.target.value);

    };

    return (
        <div className="filter-container">
            <Select
                value={room}
                onChange={handleChange}
                displayEmpty
                inputProps={{id: 'room-select'}}
                style={{marginLeft: '10px'}}
                className="dropdown" // Додано клас для стилізації
            >

                <MenuItem value="" disabled>
                    Оберіть кімнату
                </MenuItem>
                {data.map((room, index) => (
                    <MenuItem key={index} value={room.number}>
                        {`${room.number}`}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};
