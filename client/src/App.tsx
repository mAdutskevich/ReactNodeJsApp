import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Root } from 'pages/Root';

const App: React.FC = () => (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </GoogleOAuthProvider>
);

export default App;
