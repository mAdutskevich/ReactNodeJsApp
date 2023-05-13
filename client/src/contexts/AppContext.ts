import React from 'react';

interface IState {
    name: string;
    value: string;
}

interface IAppContext {
    state: IState;
    setState: React.Dispatch<React.SetStateAction<IState>>;
}

export const AppContext = React.createContext<IAppContext>({} as IAppContext);
