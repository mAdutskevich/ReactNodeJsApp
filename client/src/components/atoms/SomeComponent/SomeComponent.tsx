import React from 'react';
import { AppContext } from 'contexts/AppContext';
import { SomeComponentChild } from './SomeComponentChild';

export const SomeComponent: React.FC = React.memo(() => {
    const { state } = React.useContext(AppContext);
    
    console.log('SomeComponent rerender');

    return <SomeComponentChild />;
});
