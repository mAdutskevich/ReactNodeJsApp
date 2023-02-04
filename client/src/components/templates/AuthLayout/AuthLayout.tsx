import React from 'react';
import { Outlet } from 'react-router-dom';
import classes from './AuthLayout.module.scss';

export const AuthLayout = () => {
    return (
        <div className={classes.authLayout}>
            <Outlet />
        </div>
    );
};
