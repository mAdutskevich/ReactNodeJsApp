import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Root } from 'pages/Root';
import './App.scss';

const App: React.FC = () => (
    <BrowserRouter>
        <Root />
    </BrowserRouter>
);

export default App;
