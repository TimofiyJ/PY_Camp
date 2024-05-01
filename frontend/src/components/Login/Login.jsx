import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

export const Login = () => {
    const [login, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Запит POST на сервер для логіну
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Обробка відповіді з сервера після успішного логіну
                console.log('Login successful:', data);
                // Redirect to home page
                window.location.href = '/';
            })
            .catch(error => {
                // Обробка помилки під час логіну
                console.error('Error during login:', error);
            });
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '500px'
        }}>
            <Typography variant="h4" sx={{color: '#445082', fontWeight: 'bold', marginBottom: '0px'}}>
                Вітаємо у Sprynya Camp
            </Typography>
            <Typography variant="h6" sx={{color: '#45484C', textAlign: 'center', marginBottom: '30px'}}>
                Будь ласка, введіть ваші дані
            </Typography>
            <Box sx={{marginBottom: '15px', width: '100%', textAlign: 'left'}}>
                <label htmlFor="username" className="login-inputLabel">Логін</label>
                <TextField
                    id="login"
                    label="введіть логін"
                    variant="outlined"
                    sx={{width: '100%', borderRadius: '25px'}}
                    size="small"
                    value={login}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Box>
            <Box sx={{marginBottom: '35px', width: '100%', textAlign: 'left'}}>
                <label htmlFor="password" className="login-inputLabel">Пароль</label>
                <TextField
                    id="password"
                    label="введіть пароль"
                    variant="outlined"
                    type="password"
                    sx={{width: '100%', borderRadius: '25px'}}
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Button variant="contained" onClick={handleLogin}
                    sx={{width: '100%', borderRadius: '12px', backgroundColor: '#445082', height: '40px'}}>
                Увійти
            </Button>
        </Box>
    );
};
