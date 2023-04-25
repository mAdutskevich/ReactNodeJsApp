import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'utils/routes';
import classes from './Header.module.scss';

export const Header: React.FC = () => (
    <div className={classes.header}>
        <div>Logo</div>
        <Link className={classes.navigationWrapper} to={routes.home}>
            Navigation
        </Link>
        <div className={classes.loginWrapper}>
            <Link className={classes.login} to={routes.login}>
                {localStorage.getItem('Authorization') ? 'Log Out' : 'Log In'}
            </Link>
        </div>
    </div>
);
