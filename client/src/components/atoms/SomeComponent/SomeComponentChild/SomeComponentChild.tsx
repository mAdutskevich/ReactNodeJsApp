import React from 'react';
import { AppContext } from 'contexts/AppContext';
import { useBooksContext } from 'contexts/BooksContext';

export const SomeComponentChild: React.FC = React.memo(() => {
    const appContext = React.useContext(AppContext);
    const { state: booksState, setState: setBooksState } = useBooksContext();
    console.log('SomeComponentChild rerender');

    const handleClick = () => {
        appContext.setState({
            ...appContext.state,
            value: Math.floor(Math.random() * 10).toString(),
        });
    };

    const handleAddRandomBook = () => {
        console.log('handleAddRandomBook');
        
        setBooksState({
            ...booksState,
            books: [
                ...booksState.books,
                {
                    title: `book-${Math.floor(Math.random() * 10000)}`,
                    pagesQuantity: 10,
                },
            ],
        });
    };

    return (
        <div>
            <div>{`${appContext.state.name} - ${appContext.state.value}`}</div>
            <div style={{ backgroundColor: 'grey' }} onClick={handleClick}>
                Set random number
            </div>

            <div style={{ backgroundColor: 'green' }} onClick={handleAddRandomBook}>
                Add random book
            </div>
        </div>
    );
});
