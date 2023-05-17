import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { Root } from 'pages/Root';

const App: React.FC = (props) => {
    const [state, setState] = React.useState(1);

    React.useEffect(() => {
        // test of the SetTimeout in the App
        setTimeout(() => {
            console.log('state', state);

            setState((prev) => prev + 1);
        }, 1000);

        if (state > 10) {
            setState(1);
        }
    }, [state]);

    return (
        // test of the fragment in App
        <>
            <div>{state}</div>
        </>
        // <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
        //     <BrowserRouter>
        //         <Root />
        //     </BrowserRouter>
        // </GoogleOAuthProvider>
    );
};

export default App;
