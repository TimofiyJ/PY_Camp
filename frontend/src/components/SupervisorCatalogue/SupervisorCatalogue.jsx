import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useContext} from 'react';

const columns = [
    {
        id: 'surname',
        label: <b style={{ color: '#1D2E54'}}>Прізвище</b>, // Встановлення коліру тексту та фону
        minWidth: 150,
    },

    {   id: 'name',
        label: <b style={{ color: '#1D2E54'}}>Ім’я</b>,
        minWidth: 150
    },
    {
        id: 'birthday',
        label: <b style={{ color: '#1D2E54'}}>Дата народження</b>,
        minWidth: 150,
    },
    {
        id: 'address',
        label: <b style={{ color: '#1D2E54'}}>Адреса</b>,
        minWidth: 275,
    },
    {
        id: 'action',
        label: '',
        minWidth: 100,
        color: '#1D2E54',
    },
    {
        id: 'actionDelete',
        label: '',
        minWidth: 100,
        color: '#1D2E54',
    }
];

function createData(surname, name, birthday, address, action, actionDelete) {
    return { surname, name, birthday, address, action, actionDelete };
}

const rows = [
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів',  'Переглянути', 'Видалити'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів',  'Переглянути', 'Видалити'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів',  'Переглянути', 'Видалити'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів',  'Переглянути', 'Видалити'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів',  'Переглянути', 'Видалити'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів',  'Переглянути', 'Видалити'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів',  'Переглянути', 'Видалити'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів',  'Переглянути', 'Видалити'),
    createData('Хомин', 'Вероніка',  '17.10.2004', 'м.Львів',  'Переглянути', 'Видалити')
];

export const SupervisorCatalogue = () => {
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
                            {rows
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
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
