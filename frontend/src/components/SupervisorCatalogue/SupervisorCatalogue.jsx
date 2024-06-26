import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useContext} from 'react';
import {Link} from "react-router-dom";


const columns = [
    {
        id: 'surname',
        label: <b style={{ color: '#1D2E54'}}>Прізвище</b>, // Встановлення коліру тексту та фону
        minWidth: 120,
    },

    {   id: 'name',
        label: <b style={{ color: '#1D2E54'}}>Ім’я</b>,
        minWidth: 120
    },
    {
        id: 'gender',
        label: <b style={{ color: '#1D2E54'}}>Стать</b>,
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'birthday',
        label: <b style={{ color: '#1D2E54'}}>Дата народження</b>,
        minWidth: 150,
    },
    {
        id: 'address',
        label: <b style={{ color: '#1D2E54'}}>Адреса</b>,
        minWidth: 100,
    },
    {
        id: 'action',
        label: '',
        minWidth: 100,
        color: '#1D2E54',
    },
];

function createData(surname, name, birthday, address, detachment, houses, action) {
    return { surname, name, birthday, address, detachment, houses, action };
}

const rows = [
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів', 1,
        'Трембіта, Маринка', 'Переглянути'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів', 1,
        'Трембіта, Маринка', 'Переглянути'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів', 1,
        'Трембіта, Маринка', 'Переглянути'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів', 1,
        'Трембіта, Маринка', 'Переглянути'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів', 1,
        'Трембіта, Маринка', 'Переглянути'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів', 1,
        'Трембіта, Маринка', 'Переглянути'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів', 1,
        'Трембіта, Маринка', 'Переглянути'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів', 1,
        'Трембіта, Маринка', 'Переглянути'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів', 1,
        'Трембіта, Маринка', 'Переглянути')
];

export const SupervisorCatalogue = ({selectedGender, selectedAddress, selectedAge}) => {
    const [data, setData] = useState([{}]);
    useEffect(() => {
        const filters = {
            gender_filter: selectedGender,
            address_filter: selectedAddress,
            age_filter: selectedAge,
        };
        fetch("http://localhost:5000/allsupervisers/1", {
            method: 'POST', // or 'PUT', 'DELETE', etc. depending on your server endpoint
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, [selectedGender, selectedAddress, selectedAge]);
    
    return (
        <div className="contaner-with-table">
            <Paper sx={{minWidth: 1134, overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 550, minWidth: 1134 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'action' ? (
                                                        <Link to={`/childProfile/${row.id}`}>Переглянути</Link> // Посилання для переходу на child/id
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
