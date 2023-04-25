import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'organisms/Header';
import classes from './Layout.module.scss';

export const Layout: React.FC = () => (
    <div className={classes.mainContainer}>
        <Header />
        <Outlet />
    </div>
);
