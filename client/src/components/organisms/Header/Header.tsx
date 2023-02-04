import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'utils/routes';
// import { Button } from 'atoms/Button';
import classes from './Header.module.scss';

export const Header: React.FC = () => {
    // const handleClick = (): void => {
    //     //
    // };

    return (
        <div className={classes.header}>
            <div className={classes.logoWrapper}>Logo</div>
            {/* <div className={classes.navigationWrapper}> */}
            <Link className={classes.navigationWrapper} to={routes.home}>
                Navigation
            </Link>
            {/* </div> */}
            <div className={classes.loginWrapper}>
                <Link className={classes.login} to={routes.login}>
                    {localStorage.getItem('Authorization') ? 'Log Out' : 'Log In'}
                </Link>
                {/* <Button label="Log In" onClick={handleClick} /> */}
            </div>
        </div>
    );
};
