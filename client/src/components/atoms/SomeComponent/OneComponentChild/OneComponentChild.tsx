import React from 'react';
import { IBook } from 'interfaces/IBook';

interface IProps {
    books: IBook[];
}

export const OneComponentChild: React.FC<IProps> = React.memo((props) => {
    console.log('OneComponentChild', OneComponentChild);
    
    return (
        <>{props.books.map((item, index) => (
            <div key={index}>{`${item.title}-${item.pagesQuantity}`}</div>
        ))}</>
    );
});
