import React from 'react';
import { Outlet } from 'react-router-dom';
// import { webSocketsService } from 'services/WebSockets';
// import Box from '@mui/material/Box';
import { Header } from 'organisms/Header';
// import { Sidebar } from 'components/Sidebar';
import classes from './Layout.module.scss';

export const Layout: React.FC = () => {
    // webSocketsService.init('http://localhost:80');

    // const [isSidebarOpened, setIsSidebarOpened] = React.useState<boolean>(false);

    // const handleSidebarOpen = () => {
    //     setIsSidebarOpened(true);
    // };

    // const handleSidebarClose = () => {
    //     setIsSidebarOpened(false);
    // };

    return (
        <div className={classes.mainContainer}>
            <Header />
            {/* <Sidebar isOpened={isSidebarOpened} onCloseSidebar={handleSidebarClose} /> */}
            <Outlet />
        </div>
    );
};
