import React from 'react';
import { Navigate, useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { routes } from 'utils/routes';
import { Layout } from 'templates/Layout';
import { AuthLayout } from 'templates/AuthLayout';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { EventNew } from 'pages/EventNew';
import { Error404 } from 'pages/Error404';

export const Root: React.FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const withoutAuthRoutes = [routes.login, routes.register, routes.error404];

    const authRoutes = {
        path: routes.auth,
        element: <AuthLayout />,
        children: [
            { path: routes.all, element: <Navigate to={routes.error404} /> },
            { path: routes.empty, element: <Navigate to={routes.error404} /> },
            { path: routes.login, element: <Login /> },
            { path: routes.register, element: <Register /> },
        ],
    };

    const mainRoutes = {
        path: routes.home,
        element: <Layout />,
        children: [
            { path: routes.all, element: <Navigate to={routes.error404} /> },
            { path: routes.home, element: <Home /> },
            { path: routes.eventNew, element: <EventNew /> },
            { path: ROUTES.ERROR404, element: <Error404 /> },
        ],
    };

    const routing = useRoutes([authRoutes, mainRoutes]);

    if (!localStorage.getItem('Authorization')) {
        if (!withoutAuthRoutes.some((item) => item === pathname)) {
            navigate(routes.login);
        }
    }

    return <>{routing}</>;
};
