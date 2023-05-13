import React from 'react';
import { AppContext } from 'contexts/AppContext';

export const SomeComponentChild: React.FC = () => {
    const appContext = React.useContext(AppContext);
    console.log('SomeComponentChild rerender');

    const handleClick = () => {
        appContext.setState({ ...appContext.state, value: Math.floor(Math.random() * 10).toString() });
    };

    return (
        <div>
            <div>{`${appContext.state.name} - ${appContext.state.value}`}</div>
            <div onClick={handleClick}>Click this button</div>
        </div>
    );
};
