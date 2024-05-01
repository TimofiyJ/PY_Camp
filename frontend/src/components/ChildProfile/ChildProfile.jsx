import React, {useEffect, useState} from "react";
import "./ChildProfile.css";
// import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
// import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {Box, FormControl, InputLabel} from "@mui/material";
import {TextField} from "@mui/material";
import {useParams} from "react-router-dom";
import {ArrivalDropdown} from "../Filters/ArrivalFilter";

// поможи бо буду плакати з цим дуже
const inputStyle = {
    minWidth: "100%", // Ви можете встановити більше значення, якщо потрібно
    marginBottom: 8,
    paddingBottom: 15,
    paddingTop: 15
};

export const ChildProfile = () => {
    const {id} = useParams();
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sex, setSex] = useState('');
    const [alergy, setAlergy] = useState('');
    const [preferences, setPreferences] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [data, setData] = useState([{}]);
    //const freePlaces = null;
    const [freePlaces, setFreePlaces] = useState({});

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/child/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                    console.log(data);
                });
        }
    }, [id]);
    useEffect(() => {
        fetch(`http://localhost:5000/freeplaces`)
            .then((res) => res.json())
            .then((freePlaces) => {
                setFreePlaces(freePlaces);
                console.log(freePlaces);
            });
    }, [freePlaces]);

    useEffect(() => {
        if (data) {
            setSurname(data[2]);
            setName(data[1]);
            setAddress(data[6]);
            setPhoneNumber(data[5]);
            setSex(data[4]);
            setAlergy(data[7]);
            setPreferences(data[8]);

            // const datanarodzennya = addDays(selectedTenant.person.date_of_birth, 1);
            // console.log(datanarodzennya)
            // setBirthDate(parseDate(addDays(selectedTenant.person.date_of_birth, 1)));
        }
    }, [data]);

    const handleChange = (event) => {

    };
    const handleOnClick = () => {
        setIsDisabled(false);
    };
    const handleOnClickOk = () => {
        setIsDisabled(true);
    };

    return (
        <div className="input-container">
            <div className="input-wrapper">
                <div className='header'>Дитинка</div>
                <div className='row-of-inputs'>
                    <div className='first_column-inputs'>
                        <span className='text-above-input'>Прізвище</span>
                        <TextField label="" disabled={isDisabled}
                                   variant='outlined' size='small' style={inputStyle}
                                   value={surname}
                                   onChange={e => setSurname(e.target.value)}/>
                        <span className='text-above-input'>Стать</span>
                        <TextField label="" disabled={isDisabled}
                                   variant='outlined' size='small' style={inputStyle}
                                   value={sex}
                                   onChange={e => setSex(e.target.value)}/>
                        <span className='text-above-input'>Алергії</span>
                        <TextField label="" disabled={isDisabled}
                                   variant='outlined' size='small' style={inputStyle}
                                   value={alergy}
                                   onChange={e => setAlergy(e.target.value)}/>
                    </div>

                    <div className='second-column-inputs'>
                        <span className='text-above-input'>Ім’я</span>
                        <TextField label="" disabled={isDisabled}
                                   variant='outlined' size='small' style={inputStyle}
                                   value={name}
                                   onChange={e => setName(e.target.value)}/>
                        <span className='text-above-input'>Номер телефону</span>
                        <TextField label="" disabled={isDisabled}
                                   variant='outlined' size='small' style={inputStyle}
                                   value={phoneNumber}
                                   onChange={e => setPhoneNumber(e.target.value)}/>
                        <span className='text-above-input'>Особливі побажання</span>
                        <TextField label="" disabled={isDisabled}
                                   variant='outlined' size='small' style={inputStyle}
                                   value={preferences}
                                   onChange={e => setPreferences(e.target.value)}/>
                    </div>

                    <div className='third-column-inputs'>
                        <span className='text-above-input' style={{paddingTop: 15}}>Адреса</span>
                        <TextField label="" disabled={isDisabled}
                                   variant='outlined' size='small' style={inputStyle}
                                   value={address}
                                   onChange={e => setAddress(e.target.value)}/>
                        <div>
                            <span className='text-above-input'>Дата народження</span>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="" disabled={isDisabled}
                                            value={birthDate} onChange={setBirthDate}
                                            renderInput={(params) => <TextField {...params} size='small'
                                                                                style={inputStyle}/>}
                                />
                            </LocalizationProvider> */}
                        </div>

                    </div>

                    <div className='fourth-column-inputs'>
                        {freePlaces && <Box sx={{minWidth: 120, marginBottom: 2}}>
                            <FormControl fullWidth>
                                <InputLabel id="freePlace-select-label">Будинок, кімната, ліжко</InputLabel>
                                <Select
                                    labelId="freePlace-select-label"
                                    id="freePlace-select"
                                    value={freePlaces.id || ''}
                                    label="Будинок, кімната, ліжко"
                                    onChange={handleChange}
                                >
                                    {freePlaces.map(freePlace => (
                                        <MenuItem key={freePlace.id} value={freePlace.id}>
                                            {`${freePlace.house}, ${freePlace.room}, ${freePlace.bed}`} {/* Додайте комбінацію будинка, кімнати і ліжка */}
                                        </MenuItem>
                                    ))}
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>}
                    </div>
                </div>

                <div className="button-container">
                    <button className="button-right-down" onClick={handleOnClick}>Редагувати</button>
                </div>
                {!isDisabled && <div className="button-container">
                    <button className="button-right-down-ok" onClick={handleOnClickOk}>Оk</button>
                </div>}
            </div>
        </div>
    );
};

