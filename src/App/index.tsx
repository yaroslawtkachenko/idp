import * as React from 'react';

export interface AppProps {
    message: String;
}

function App(props: AppProps) {
    return (
        <div>
            {props.message}
        </div>
    );
}

export default App;
