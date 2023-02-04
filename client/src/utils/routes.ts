import { ROUTES, SUB_ROUTES } from 'constants/routes';

export const routes = {
    auth: `/${ROUTES.AUTH}`,
    home: '/',
    settings: `/${ROUTES.SETTINGS}`,
    login: `/${ROUTES.AUTH}/${SUB_ROUTES.AUTH.LOGIN}`,
    register: `/${ROUTES.AUTH}/${SUB_ROUTES.AUTH.REGISTER}`,
    eventNew: `/${ROUTES.EVENTS}/${SUB_ROUTES.EVENTS.NEW}`,
    error404: `/${ROUTES.ERROR404}`,
    empty: '',
    all: '*',
};
