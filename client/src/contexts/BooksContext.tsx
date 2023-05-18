import React from 'react';
import { IBook } from 'interfaces/IBook';

type IMagazine = {
    title: string;
    pagesQuantity: number;
};

interface IState {
    books: IBook[];
    magazines: IMagazine[];
}

interface IBooksState {
    state?: IState;
    setState?: React.Dispatch<React.SetStateAction<IState>>;
}

const initialState: IState = {
    books: [
        {
            title: 'default book',
            pagesQuantity: 10,
        },
    ],
    magazines: [
        {
            title: 'default magazine',
            pagesQuantity: 10,
        },
    ],
};

const BooksContext = React.createContext<IBooksState>({});

const BooksContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [state, setState] = React.useState<IState>(initialState);

    return <BooksContext.Provider value={{ state, setState }}>{props.children}</BooksContext.Provider>;
};

const useBooksContext = () => React.useContext(BooksContext);

export { BooksContextProvider, useBooksContext }
