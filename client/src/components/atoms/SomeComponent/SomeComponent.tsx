import React from 'react';
// import { AppContext } from 'contexts/AppContext';
import { useBooksContext } from 'contexts/BooksContext';
import { SomeComponentChild } from './SomeComponentChild';
import { OneComponentChild } from './OneComponentChild';

export const SomeComponent: React.FC = React.memo(() => {
    // const { state: appState } = React.useContext(AppContext);
    // const booksContext = React.useContext(BooksContext);
    const { state: booksState } = useBooksContext();

    console.log('SomeComponent booksState', booksState);

    // React.useEffect(() => {
    //     console.log('book context changed', booksContext);

    // }, [booksContext]);

    console.log('SomeComponent rerender');
    // console.log('SomeComponent appState', appState);
    // console.log('SomeComponent booksState', booksState);

    return <>
        <SomeComponentChild />
        <OneComponentChild books={booksState.books} />
    </>;
});
