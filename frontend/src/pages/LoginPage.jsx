import React from 'react';
import { Login } from '../components/Login/Login';
import './LoginPage.css';

export const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-catalogueBlock">
                <Login />
            </div>
        </div>
    );
};
