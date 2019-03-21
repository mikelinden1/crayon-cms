import React from 'react';

import Header from 'components/header';
import Main from 'components/main';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="app-wrapper">
                    <Main />
                </div>
            </div>
        );
    }
}

export default App;
